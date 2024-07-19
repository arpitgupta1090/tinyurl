import {body, param} from 'express-validator'


export class AdminValidator{

    getValidator = [
        param('id', 'Invalid id').isNumeric()
      ]
}

const validator: AdminValidator = new AdminValidator(); 
export default validator;