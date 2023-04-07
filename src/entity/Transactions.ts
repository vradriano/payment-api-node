import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { Accounts } from "./Accounts"

@Entity()
export class Transactions {
  @PrimaryGeneratedColumn()
  id: number
  
  @ManyToOne(() => Accounts, account => account.id)
  @JoinColumn({ name: "debitedAccountId" })
  @Column({ type: "decimal" })
  debitedAccountId: Accounts["id"]

  @ManyToOne(() => Accounts, account => account.id)
  @JoinColumn({ name: "creditedAccountId" })
  @Column({ type: "decimal" })
  creditedAccountId: Accounts["id"]

  @Column({ type: "decimal" })
  value: number

  @Column({ type: "decimal" })
  createdAt: number
}

