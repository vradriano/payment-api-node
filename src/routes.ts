import { Router } from 'express'
import { UserController } from './controllers/UserController'
import { TransactionController } from './controllers/TransactionController'
import { AuthMiddleware } from './middlewares/authMiddleware'
import { AccountController } from './controllers/AccountControllers'

const routes = Router()

routes.get('/users/getSession', AuthMiddleware, new UserController().getSession)
routes.post('/users/create', new UserController().createUser)
routes.post('/users/signIn', new UserController().signIn)

routes.get('/:id/transactions', AuthMiddleware, new TransactionController().getHistoryTransactions)
routes.post('/transactions/create', AuthMiddleware, new TransactionController().createTransaction)

routes.get('/:id/accountBalance', AuthMiddleware, new AccountController().getUserBalance)


export default routes