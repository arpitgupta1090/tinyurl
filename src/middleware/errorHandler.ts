import express from "express";

export function errorHandler(err:any, request:express.Request, response:express.Response, next:express.NextFunction) {
    
    if (err.httpCode){
        response.status(err.httpCode).json({ 
            message: err.message,
            status: err.name,
            data: {}
        });
    }
    else {
        console.error(err.stack)
        response.status(500).json({ 
            message: "Something went wrong.",
            status: "INTERNAL_SERVER_ERROR",
            data: {}
        });
    }
  }
