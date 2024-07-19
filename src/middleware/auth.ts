import express from "express";
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import dotEnv from 'dotenv'; 
import { UnauthorizedError, ForbiddenError, InternalServerError } from "../responses/customErrors";

dotEnv.config({path: './.env'});
const SECRET_KEY = process.env.SECRET_KEY!

function checkRole(role:string, userData:any){
    if(role == 'superUser' && !userData.isSuperUser){
        throw new ForbiddenError("access denied")
    } 
    if(role == 'admin' && !userData.isAdmin && !userData.isSuperUser){
        throw new ForbiddenError("access denied")
    } 
}


const authMiddleware = (role:string='general') => {
    return async(request:express.Request, response:express.Response, next: express.NextFunction) => {
        try{
            const token:string|undefined = request.header('Authorization')?.replace('Bearer ', '');
            if (token && typeof token === "string"){
                try{
                    const userData:any = jwt.verify(token, SECRET_KEY)
                    checkRole(role, userData)
                    request.body.decodedUserData = userData;
                    next()
                }
                catch(error){
                    if(error instanceof ForbiddenError){
                        throw new ForbiddenError("access denied")
                    }
                    throw new UnauthorizedError("Invalid token")
                }
            }
            else
            {
                throw new UnauthorizedError("Token not found/Invalid token")
            }
        }
        catch(error){
            next(error)
        }
    }
}

export default authMiddleware;