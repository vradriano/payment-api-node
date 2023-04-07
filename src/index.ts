import { AppDataSource } from "./data-source"
import express from 'express'
import cors from 'cors'
import routes from "./routes"

AppDataSource.initialize().then(async () => {
    const app = express()

    app.use(express.json())
    app.use(cors())

    app.use(routes)

    return app.listen(process.env.NODE_API_PORT)
}).catch(error => console.log(error))
