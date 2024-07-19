import {Response} from "express";

export const successResponse = (response:Response, data:any, msg:string) => {
    response.status(200).json({
        data: data,
        message: msg,
        status: "success"
    })
}