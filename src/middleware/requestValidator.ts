import {validationResult} from 'express-validator'
import {Request, Response, NextFunction} from "express";

type errorType = {
    type: string;
    msg: string;
    location: string;
    path: string;
  };


export const validate = (req:Request, res:Response, next:NextFunction) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    } 
    let decodedErrors:object[] = []
    JSON.parse(JSON.stringify(errors.array())).map((err:errorType) => 
        decodedErrors.push(
            { 
                "location": `${err.type}::${err.location}->${err.path}`,
                "message": err.msg
            }
        )
    )
    return res.status(422).json({ 
        message: {errors: decodedErrors},
        status: "Unprocessable Entity",
        data: {}
    })
  }