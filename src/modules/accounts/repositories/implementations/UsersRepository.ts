import { Repository } from "typeorm";
import { AppDataSource } from "../../../../database/data-source";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";


class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }
  

  async create({ 
    driver_license, 
    email, 
    name, 
    password
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      driver_license, 
      email, 
      name, 
      password, 
      isAdmin: false
    }) ;

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ where: {email} })
    return user;
  }

}

export { UsersRepository }