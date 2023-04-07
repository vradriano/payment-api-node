import { Request, Response } from "express";
import { accountRepository } from "../repositories/accountRepository";

export class AccountController {
  async getUserBalance(req: Request, res: Response) {
    const { id } = req.params

    try {
      const getTransactionData = await accountRepository.findOneBy({ id: Number(id) })

      return res.status(201).json(getTransactionData)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ success: false, message: "Error"})
    }
  }
}