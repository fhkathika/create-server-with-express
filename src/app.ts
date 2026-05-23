import express, { type Application, type Request, type Response } from "express"
import {Pool} from "pg"
import config from "./config"
import { pool } from "./db"
import { userRoute } from "./modules/user/user.route"
import { profileROute } from "./modules/profile/profile.route"
import { authRouter } from "./modules/auth/auth.route"
import fs from "fs"
const app:Application = express()

app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended:true}))
app.use((req, res, next) => {
  console.log('Method-URL-Time:', req.method,req.url,Date.now())
 const log=`\nMethd->${ req.method} Time ->${Date.now()}URL${req.url}\n`
 fs.appendFile("logger Text",log,(err)=>{
console.log(err)
 }) 
 next()
})

app.get('/', (req:Request, res:Response) => {
//   res.send('Hello World')
res.status(200).json({
    "message":"Express Server",
    "author":"next level",

})
})
app.use('/api/user',userRoute)
app.use("/api/profile",profileROute)
app.use("/api/auth",authRouter);

export default app
