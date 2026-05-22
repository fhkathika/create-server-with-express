import type { NextFunction, Request, Response } from "express"
import config from "../config";
import jwt, { type JwtPayload } from "jsonwebtoken"
import { pool } from "../db";
const auth=()=>{
    return async (req:Request,res:Response,next:NextFunction)=>{
try{
// console.log("this is protected route")
const token=req.headers.authorization;
if(!token){
   res.status(401).json({
    "success":false,
    "message":"Unauthrized!!"
   }) 
  
}
 const decoded=jwt.verify(token as string,config.secret as string) as JwtPayload
console.log("decode",decoded)
const userData=await pool.query(`
    SELECT * FROM users WHERE email=$1`,[decoded.email])
   
    const user=userData.rows[0]
  if(userData.rows.length===0){
res.status(404).json({
    success:false,
    message:"Users not found"
})
  }
  if(!user.is_active){
    res.status(403).json({
    success:false,
    message:"Forbidden"
})
req.user=decoded
  }
next()
}
catch(err){
next(err)
}
}
}
export default auth