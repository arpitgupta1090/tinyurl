import {Request, Response, NextFunction} from "express";
import {setProperty} from '../utils/general'
import UserService from "../services/user";
import { NotFoundError } from "../responses/customErrors";
import { successResponse } from "../responses/customResponse";

const service:UserService = new UserService();

class AdminControler {
    public static listAll = async (request:Request, response:Response, next:NextFunction) => {
        try{
            const users = await service.getAllUsers()
            successResponse(response, users, "users fetched successfully")
        }
        catch(err){
            next(err)
        }
    }

    public static get = async (request:Request, response:Response, next:NextFunction) => {
        const id:number = Number(request.params.id);
        try {
            const user = await service.getUserById(id)
            if(user){
                successResponse(response, user, "user fetched successfully")
            }
            else {
                throw new NotFoundError("user not found")
            }
        }
        catch(err){
            next(err)
        }
    }

    public static activateUser = async (request:Request, response:Response, next:NextFunction) => {
        const id:number = Number(request.params.id);
        try {
            const user = await service.getUserById(id)
            if(user){
                AdminControler.setPropertyTrue(user, "isActive", "user activated successfully", response)
            }
            else {
                throw new NotFoundError("user not found")
            }
        }
        catch(err){
            next(err)
        }
    }

    public static activateAdmin = async (request:Request, response:Response, next:NextFunction) => {
        const id:number = Number(request.params.id);
        try{
            const user = await service.getUserById(id)
            if(user){
                AdminControler.setPropertyTrue(user, "isAdmin", "user updated successfully", response)
            }
            else {
                throw new NotFoundError("user not found")
            }
        }
        catch(err){
            next(err)
        }
    }

    public static deleteUser = async (request:Request, response:Response, next:NextFunction) => {
        const id:number = Number(request.params.id);
        try{
            const user = await service.getUserById(id)
            if(user){
                AdminControler.setPropertyTrue(user, "isDeleted", "user deleted successfully", response)
            }
            else {
                throw new NotFoundError("user not found")
            }
        }
        catch(err){
            next(err)
        }
    }

    protected static setPropertyTrue = (user:any, property:any, successMessage:string, response:Response) => {
        if (user.hasOwnProperty(property)) {
            setProperty(user, property, true)
        }
        user.save()
        successResponse(response, {userId:user.id}, successMessage)
    }
}


export default AdminControler;