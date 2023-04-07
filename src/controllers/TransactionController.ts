import { Request, Response } from "express";
import { accountRepository } from "../repositories/accountRepository";
import { transactionRepository } from "../repositories/transactionRepository";
import { userRepository } from "../repositories/userRepository";
import { formatValueIfLessThanOne } from "../utils/formatCurrencyValue";

export class TransactionController {
  async createTransaction(req: Request, res: Response) {
    const { userDebited, userCredited, value } = req.body

    if( userDebited === userCredited) {
      res.status(400).json({ success: false, message: 'You are not allowed to transfer for yourself, please try again!'})
    }

    try {
      const getUserInfo = await userRepository.findOneBy({ username: userDebited })

      const getUserBalance = await accountRepository.findOneBy({ id: getUserInfo!.account.id })

      const userBalance = formatValueIfLessThanOne(getUserBalance!.balance)

      if(userBalance < value) {
        return res.status(400).json({ error: "Insufficient funds, please try again!" })
      }

      const getCreditedUser = await userRepository.findOneBy({ username: userCredited })

      if(!getCreditedUser) {
        return res.status(401).json({ error: "User doesn't exists!"})
      }

      const newTransactions = transactionRepository.create({ 
        debitedAccountId: getUserInfo!.account.id, 
        creditedAccountId: getCreditedUser!.id, 
        value, 
        createdAt: Date.now() 
      })

      await transactionRepository.save(newTransactions)

      const debitedBalanceSum = userBalance - value

      accountRepository.update(getUserInfo!.account.id, {
        balance: debitedBalanceSum
      })

      const getCreditedBalance = await accountRepository.findOneBy({ id: getCreditedUser?.id })

      const creditedBalanceSum = Number(getCreditedBalance!.balance) + value

      accountRepository.update(getCreditedUser!.id, {
        balance: creditedBalanceSum
      })
      
      return res.status(200).json(newTransactions)
    } catch (error) {
      console.log(error)
      return res.status(401).json({ success: false, message: "Error"})
    }
  }

  async getHistoryTransactions(req: Request, res: Response) {
    const { id } = req.params

    try {
      const getTransactionData = await transactionRepository.find({ 
        where: [
          { debitedAccountId: Number(id) },
          { creditedAccountId: Number(id) },
        ]
      })

      return res.status(201).json(getTransactionData)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ success: false, message: "Error"})
    }
  }
}