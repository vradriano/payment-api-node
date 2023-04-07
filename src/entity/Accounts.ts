import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Transactions } from "./Transactions";
import { Users } from "./Users";

@Entity()
export class Accounts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "decimal" })
  balance: number;

  @OneToOne(() => Users, user => user.account)
  @JoinColumn()
  user: Users;

  @OneToMany(() => Transactions, (transaction) => transaction.debitedAccountId)
  debitedTransactions: Transactions[];
  
  @OneToMany(() => Transactions, (transaction) => transaction.creditedAccountId)
  creditedTransactions: Transactions[];
}
