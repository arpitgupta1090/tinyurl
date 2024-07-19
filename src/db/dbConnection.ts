
import { createConnection } from "typeorm"; 
import { Url } from '../../src/entity/url'
import { User } from "../entity/user";
import {config} from '../config/ormconfig';

const main = async () => {
    try {
        await createConnection({
            type: "sqlite", 
            database: "database.db", 
            entities: [Url, User],
            synchronize: true,
            logging: false,
        
           })
        console.log("Connected to DB")
    }
    catch (error) {
        console.error(error)
        throw new Error("Unable to connect to DB")
    }
}

export default main;
