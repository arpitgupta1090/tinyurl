import {body, param} from 'express-validator'


export class UrlValidator{

    longUrlValidator = [
        body('longUrl', 'Invalid longUrl').isURL().matches('^(http|https):\/\/[^ "]+$')
      ]

      shorlUrlValidator = [
        param('shortUrl', 'Invalid shortUrl').isAlphanumeric()
      ]
}

const validator: UrlValidator = new UrlValidator(); 
export default validator;