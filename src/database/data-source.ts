import 'reflect-metadata'
import { DataSource } from 'typeorm';
import { User } from '../modules/accounts/entities/User';
import { Category } from '../modules/cars/entities/Category';
import { Specification } from '../modules/cars/entities/Specification';
import { CreateCategoryTable1677595419407 } from './migrations/1677595419407-CreateCategoryTable';
import { CreateSpecifications1677681641945 } from './migrations/1677681641945-CreateSpecifications';
import { CreateUsers1677759912849 } from './migrations/1677759912849-CreateUsers';
import { AlterUserRemoveUsername1677764578850 } from './migrations/1677764578850-AlterUserRemoveUsername';


export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "admin",
  database: "rentalx", 
  synchronize: true,
  logging: false,
  migrations: [
    CreateCategoryTable1677595419407, 
    CreateSpecifications1677681641945,
    CreateUsers1677759912849,
    AlterUserRemoveUsername1677764578850
  ],
  entities: [Category, Specification, User],
});

