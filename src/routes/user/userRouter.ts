import express from "express";
import UserControler from "../../controller/user";
import authMiddleware from "../../middleware/auth";
import { validate } from "../../middleware/requestValidator";
import validator from "../../schema/user";

const userRouter: express.Router = express.Router();

userRouter.post('/signup', validator.signupValidator, validate, UserControler.signup);
userRouter.post('/login', validator.loginValidator, validate, UserControler.login);
userRouter.patch('/', validator.updateValidator, validate, authMiddleware(), UserControler.updateUser);

export default userRouter;