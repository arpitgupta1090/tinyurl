import express from 'express';
import cors from 'cors';
import dotEnv from 'dotenv'; 
import userRouter from './src/routes/user/userRouter';
import urlRouter from './src/routes/url/urlRouter';
import redirectRouter from './src/routes/url/redirectRouter';
import adminRouter from './src/routes/user/adminRouter';
import main from './src/db/dbConnection'
import { errorHandler } from './src/middleware/errorHandler';

const app: express.Application = express();

dotEnv.config({path: './.env'});

app.use(cors());
app.use(express.json());

app.get('/', (request:express.Request, response:express.Response) => {
    response.status(200).send(`<h1>Welcome to TinyUrl</h1>`)
})

main()

// router configuration
app.use('/users', adminRouter)
app.use('/', userRouter)
app.use('/url', urlRouter)
app.use('/', redirectRouter)

// custome error handler
app.use(errorHandler);

const hostname:string = process.env.HOSTNAME!
const port:number = Number(process.env.PORT!)

app.listen(port, hostname, () => {
    console.log("Express server started")
})
