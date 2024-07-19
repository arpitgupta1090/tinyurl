import { ConnectionOptions } from 'typeorm';

export const config: ConnectionOptions = { 
   type: "sqlite", 
   database: "database.db", 
   synchronize: true, 
   logging: true, 
   entities: [ 
      "src/entity/**/*.ts" ], 
   migrations: [ "src/migration/**/*.ts" 
   ], 
   subscribers: [ "src/subscriber/**/*.ts" 
   ]  
 }

 module.exports = config;