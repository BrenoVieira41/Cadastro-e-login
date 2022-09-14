import 'reflect-metadata';
import { config } from 'dotenv';
import { AppDataSource } from './typeorm/data-source';
import { app } from './app';


config();
const appPort = process.env.APP_PORT;
//Database connection required.
AppDataSource.initialize().then(() => {
  app.listen(appPort, () => console.log(`Server is running in port:${appPort}`));
});

