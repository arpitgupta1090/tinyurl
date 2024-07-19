import express from "express";
import {shortUrlToId} from "../../services/url";
import {Url} from '../../entity/url'
import {validURL} from '../../utils/url'

const redirectRouter:express.Router = express.Router()


redirectRouter.get('/:shorlUrl', async (request:express.Request, response:express.Response) => {
    try {
        let {shorlUrl} = request.params;
        let id:number = shortUrlToId(shorlUrl)
        const url = await Url.findOneBy({
            id: id,
        })
        if (url?.longUrl){
            if (validURL(url?.longUrl)){
                response.status(302).redirect(url.longUrl)
            }
            else {
                response.status(400).send(`<h1>invalid url</h1>`)
            }
        }
        else {
            response.status(404).send(`<h1>url not found</h1>`)
        }
        
    }
    catch (error) {
        response.status(500).json({
            errors :[
                {
                    msg: error,
                    status: "internal server error"
                }
            ]
        })
    }
   
});

export default redirectRouter;
