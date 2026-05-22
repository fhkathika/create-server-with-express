import { Router, type Request, type Response } from "express";
import { pool } from "../../db";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";

const router=Router()

// add user 
router.post('/',userController.createUser)
// get all user 
router.get('/',auth(),userController.getAllUser)
// get single user 
router.get('/:id',userController.getSingleUser)

//put method 
router.put('/:id',userController.updateUser)

// delete user

router.delete('/:id',userController.deleteUser)

export const userRoute=router