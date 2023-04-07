import { AppDataSource } from "../data-source";
import { Accounts } from "../entity/Accounts";

export const accountRepository = AppDataSource.getRepository(Accounts)