import {body} from 'express-validator'


export class UserValidator{

    loginValidator = [
        body('email', 'Invalid email').isEmail(),
        body('password', 'Password length should be atleast 6 characters').isLength({min: 6}),
      ]

      signupValidator = [
        body('userName', 'Empty userName').exists({checkFalsy: true}),
        body('email', 'Invalid email').isEmail(),
        body('password', 'Password length should be atleast 6 characters').isLength({min: 6}),
      ]

      updateValidator = [
        body('userName', 'Empty userName').optional(),
        body('password', 'Password length should be atleast 6 characters').optional().isLength({min: 6}),
      ]
}

const validator: UserValidator = new UserValidator(); 
export default validator;