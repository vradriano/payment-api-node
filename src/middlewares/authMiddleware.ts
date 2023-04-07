import { NextFunction, Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import jwt from "jsonwebtoken"

type JwtPayload = {
  id: number
}

export const AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers

  if(!authorization) {
    res.status(401).json({ success: false, message: "Unauthorized" })
  }

  const tokenWithoutBearer = authorization?.split(' ')[1]

  const { id } = jwt.verify(tokenWithoutBearer!, process.env.JWT_TOKEN ?? '') as JwtPayload

  const user = await userRepository.findOneBy({ id })

  if (!user) {
    return res.status(401).json({ success: false, message: 'Unauthorized!'})
  }

  const { password: _, ...userSession}  = user

  req.user = userSession

  next()
}