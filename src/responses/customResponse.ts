import {Response} from "express";

export const successResponse = (response:Response, data:any, msg:string) => {
    response.status(200).json({
        data: data,
        message: msg,
        status: "success"
    })
}

export const createdResponse = (response:Response, data:any, msg:string) => {
    response.status(201).json({
        data: data,
        message: msg,
        status: "success"
    })
}

export const deletedResponse = (response:Response, data:any, msg:string) => {
    response.status(204).json({
        data: data,
        message: msg,
        status: "success"
    })
}