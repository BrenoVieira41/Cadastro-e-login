import { DataSource } from "typeorm";
import 'dotenv/config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  name: 'default',
  host: process.env.HOST,
  schema: process.env.DB_SCHEMA,
  port: Number(process.env.PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
  entities: [`${__dirname}/**/entity/*.{ts,js}`],
});
