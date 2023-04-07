import { AppDataSource } from "../data-source";
import { Transactions } from "../entity/Transactions";

export const transactionRepository = AppDataSource.getRepository(Transactions)