import express from "express";
import authMiddleware from "../../middleware/auth";
import validator from "../../schema/url";
import { validate } from "../../middleware/requestValidator";
import UrlControler from "../../controller/url";

const urlRouter:express.Router = express.Router()

urlRouter.post('/', validator.longUrlValidator, validate, authMiddleware(), UrlControler.create);
urlRouter.get('/:shortUrl', validator.shorlUrlValidator, validate, authMiddleware(), UrlControler.fetch);

export default urlRouter;