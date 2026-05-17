import type { Request, Response } from "express"
import { pool } from "../../db"
import { userService } from "./user.service"

const createUser=async(req:Request,res:Response)=>{

const {name,email,password,age}=req.body

  try{
const result=await userService.createUserIntoDB(req.body)
res.status(201).json({
    message:"user created successfully",
    data:result.rows[0],
})
}
catch(error:any){
res.status(500).json({
    message:error.message,
    error:error,
})
}  
}
const getAllUser=async(REQ:Request,res:Response)=>{
try{
const result=await userService.getAllUsersFromDB()
    res.status(200).json({
        success:true,
        message:"Users,retrived successfully",
        data:result.rows
    })
}
catch(err:any){
 res.status(500).json({
        success:false,
        message:err.message,
        error:err
    })
}
}

const getSingleUser=async(req:Request,res:Response)=>{
const {id}=req.params;
console.log(id)
try{
const result=await userService.getSingleUserFromDB(id as string)
      if(result.rows.length===0){
        res.status(404).json({
            success:false,
    message:"Users not found",
    data:{}
})
    }
      res.status(200).json({
        success:true,
        message:"User,retrived successfully",
        data:result.rows[0]
    })
  
}
catch(error:any){
res.status(500).json({
    message:error.message,
    error:error,
})
}
}
const updateUser=async(req:Request,res:Response)=>{
const {id}=req.params;
// console.log("Id:",id)
// console.log({name,password,age,is_active})
try{
const result=await userService.updateUserFromDB(req.body,id as string)
if(result.rows.length===0){
    res.status(404).json({
        success:false,
        message:"User not found"
    })
}
 res.status(200).json({
        success:true,
        message:"User,updated successfully",
        data:result.rows[0]
    })
}
catch(err:any){
 res.status(500).json({
        success:false,
        message:err.message,
        error:err
    })
}

}

const deleteUser=async(req:Request,res:Response)=>{
const {id}=req.params;
try{
const result=await userService.deleteUserFromDB(id as string)
    if(result.rowCount===0){
            res.status(404).json({
        success:false,
        message:"User not found"
    })
    }
    res.status(200).json({
        success:true,
        message:"User deleted successfully",
        data:{}
    })
}
catch(err:any){
    res.status(500).json({
        success:false,
        message:err.message,
        error:err
    }) 
}
}
export const userController={
    createUser,
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser
}