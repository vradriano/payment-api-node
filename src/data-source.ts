import "reflect-metadata"
import 'dotenv/config'
import { DataSource } from "typeorm"

const port = process.env.DATABASE_PORT as number | undefined


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: port,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [`${__dirname}/**/entity/*.{ts,js}`],
	migrations: [`${__dirname}/**/database/migrations/*.{ts,js}`],
})
