import {Router} from "express";
import AdminControler from '../../controller/admin'
import authMiddleware from "../../middleware/auth";
import { validate } from "../../middleware/requestValidator";
import validator from "../../schema/admin";

const adminRouter:Router = Router()


adminRouter.get('/', authMiddleware('admin'), AdminControler.listAll);
adminRouter.put('/:id/activate', validator.getValidator, validate, authMiddleware('admin'), AdminControler.activateUser);
adminRouter.put('/:id/admin', validator.getValidator, validate, authMiddleware('superUser'), AdminControler.activateAdmin);
adminRouter.delete('/:id', validator.getValidator, validate, authMiddleware('admin'), AdminControler.deleteUser);
adminRouter.get('/:id', validator.getValidator, validate, authMiddleware('admin'), AdminControler.get);


export default adminRouter;
