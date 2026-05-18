import { pool } from "../../db";

const loginUserIntoDB=async(payload:{
    email:string;
    password:string;
})=>{
const {email,password}=payload;
// 1. check if the user exist
// 2.compare the password
// 3.generate token 
const userData=await pool.query(`
    
    SELECT * FROM users WHERE email=$1`,[email]);
    const user=userData.rows[0]
    console.log("user",user)
}
export const authService={
    loginUserIntoDB
}