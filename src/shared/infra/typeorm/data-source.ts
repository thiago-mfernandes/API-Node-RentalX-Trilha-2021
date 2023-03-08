
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import 'reflect-metadata'
import { DataSource } from 'typeorm';
import { CreateCategoryTable1677595419407 } from './migrations/1677595419407-CreateCategoryTable';
import { CreateSpecifications1677681641945 } from './migrations/1677681641945-CreateSpecifications';
import { CreateUsers1677759912849 } from './migrations/1677759912849-CreateUsers';
import { AlterUserRemoveUsername1677764578850 } from './migrations/1677764578850-AlterUserRemoveUsername';
import { AlterUserAddAvatar1677841700513 } from './migrations/1677841700513-AlterUserAddAvatar';
import { CreateCars1678278893396 } from './migrations/1678278893396-CreateCars';


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
    AlterUserRemoveUsername1677764578850,
    AlterUserAddAvatar1677841700513,
    CreateCars1678278893396
  ],
  entities: [User, Category, Specification, Car]
});

