import {Request, Response, NextFunction} from "express";
import { idToShortUrl} from "../services/url";
import {Url} from '../entity/url'
import { successResponse, createdResponse } from "../responses/customResponse";
import { NotFoundError } from "../responses/customErrors";

class UrlControler {
    public static create = async (request:Request, response:Response, next:NextFunction) => {
        try {
            const {longUrl} = request.body
            const url = Url.create({longUrl: longUrl})    
            await url.save()
            
            let shortUrl:string = idToShortUrl(url.id)
            await Url.update(url.id, { shortUrl: shortUrl })
            createdResponse(response, {shortUrl: `${request.protocol}://${request.get('host')}/${shortUrl}`}, "Short url created successfully")
        }
        catch (error) {
            next(error)
        }
    }

    public static fetch = async (request:Request, response:Response, next:NextFunction) => {
        try {
            let {shortUrl} = request.params;
            const url = await Url.findOneBy({shortUrl:shortUrl})
            if (!url){
                throw new NotFoundError("Url not found")
            }
            else {
                successResponse(response, {url: url?.longUrl}, "Long url fetched successfully")
            }   
        }
        catch (error) {
            next(error)
        }
    }
}

export default UrlControler;