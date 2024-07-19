import {Request, Response, NextFunction} from "express";
import UserService from "../services/user";
import jwt from 'jsonwebtoken';
import dotEnv from 'dotenv'; 
import { UnauthorizedError, NotFoundError } from "../responses/customErrors";
import { successResponse } from "../responses/customResponse";

dotEnv.config({path: './.env'});
const service:UserService = new UserService();
const SECRET_KEY = process.env.SECRET_KEY!

class UserControler {
    public static signup = async (request:Request, response:Response, next:NextFunction) => {
        try {
            const {userName, email, password} = request.body
            const user = await service.create(userName, email, password)
            successResponse(response, user, "user created successfully")
        }
        catch (error) {
            next(error)
        } 
    }

    public static login = async (request:Request, response:Response, next:NextFunction) => {
        try{
            const {email, password} = request.body
            const user = await service.getUserByEmailPassword(email)
            if (password === user?.password){
                const payload = {
                    "userName": user?.userName,
                    "id": user?.id,
                    "email": user?.email,
                    "isActive": user?.isActive,
                    "isAdmin": user?.isAdmin,
                    "isSuperUser": user?.isSuperUser
                }
                
                let token = jwt.sign(payload, SECRET_KEY)
                successResponse(response, {token:token}, "loggged in successfully")
            }
            else {
                throw new UnauthorizedError("Invalid credentials")
            }
        }
        catch (error) {
            next(error)
        }
    }

    public static updateUser = async (request:Request, response:Response, next:NextFunction) => {
        try {
            const {userName, password, decodedUserData} = request.body
            const user = await service.update(decodedUserData.id, userName, password)
            if(user){
                successResponse(response, user, "user updated successfully")
            }
            else {
                throw new NotFoundError("user not found")
            }
        }
        catch(err){
            next(err)
        }
    }
}

export default UserControler;