import express, { type Application, type Request, type Response } from "express"
import {Pool} from "pg"
import config from "./config"
import { pool } from "./db"
import { userRoute } from "./modules/user/user.route"
import { profileROute } from "./modules/profile/profile.route"
import { authRouter } from "./modules/auth/auth.route"
import logger from "./middleware/logger"
import CookieParser from "cookie-parser"
import cors from "cors"
import globalErrorHandler from "./middleware/globalError_Handler"
const app:Application = express()
app.use(CookieParser())
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended:true}))
app.use(logger)

const corsOptions = {
  origin: 'http://localhost:5000/',

}
app.use(cors(corsOptions))

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
app.use(globalErrorHandler);
export default app
