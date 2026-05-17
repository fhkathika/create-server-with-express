import express, { type Application, type Request, type Response } from "express"
import {Pool} from "pg"
import config from "./config"
import { pool } from "./db"
import { userRoute } from "./modules/user/user.route"
import { profileROute } from "./modules/profile/profile.route"
const app:Application = express()

app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended:true}))


app.get('/', (req:Request, res:Response) => {
//   res.send('Hello World')
res.status(200).json({
    "message":"Express Server",
    "author":"next level",

})
})
app.use('/api/user',userRoute)

app.use("/api/profile",profileROute)
export default app
