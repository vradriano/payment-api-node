import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Accounts } from "./Accounts";

@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', unique: true })
    username: string;

    @Column()
    password: string;

    @OneToOne(() => Accounts)
    @JoinColumn()
    account: Accounts;
}
