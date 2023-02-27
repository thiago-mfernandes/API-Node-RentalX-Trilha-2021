import 'dotenv/config'
import 'reflect-metadata'
import { DataSource } from 'typeorm';

const port = process.env.TYPEORM_PORT as unknown as number | undefined;

export const AppDataSource = new DataSource({
  type: 'postgres',
  port: port,
  host: process.env.TYPEORM_HOST,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_NAME, 
  entities: [`${__dirname}/**/entities/*.{ts,js}`],
  migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
});

