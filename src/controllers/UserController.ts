import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import { accountRepository } from "../repositories/accountRepository";

export class UserController {
  async createUser(req: Request, res: Response) {
    const { username, password } = req.body
  
    if (!username || !password) {
      return res.status(400).json({ success: false })
    }
  
    try {
      const hasUser = await userRepository.findOneBy({ username })
  
      if (hasUser) {
        return res.status(404).json({ success: false, message: 'User exists!' })
      }
  
      const newAccount = await accountRepository.create({ balance: 100 });
      await accountRepository.save(newAccount);
  
      const hashPassword = await bcrypt.hash(password, 10)
  
      const newUser = userRepository.create({
        username,
        password: hashPassword,
        account: newAccount
      })
  
      await userRepository.save([newUser])
  
      const { password: _, ...user } = newUser
  
      return res.status(201).json(user)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ success: false, message: 'Error' })
    }
  }

  async signIn(req: Request, res: Response) {
    const { username, password } = req.body

    const user = await userRepository.findOneBy({ username })

    if (!user) {
      return res.status(404).json({ success: false, message: 'Username or password is invalid!'})
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password )

    if (!isPasswordCorrect) {
      return res.status(400).json({ success: false, message: 'Username or password is invalid!'})
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_TOKEN ?? '', { expiresIn: '24h' })

    const { password: _, ...userData } = user

    return res.json({
      user: userData,
      token
    })
  }

  async getSession(req: Request, res: Response) {
    return res.status(200).json(req.user)
  }
}