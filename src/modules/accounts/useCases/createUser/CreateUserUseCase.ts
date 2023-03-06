import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { hash } from "bcrypt";
import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  
  async execute({
    driver_license, 
    email, 
    name, 
    password
  }: ICreateUserDTO): Promise<void> {

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if(userAlreadyExists) {
      throw new AppError("User Already Exists!")
    }

    //passar a senha e um numero de nivel de seguranca
    const passwordHash = await hash(password, 8)

      await this.usersRepository.create({
        driver_license, 
        email, 
        name, 
        password: passwordHash
      })
    }

}

export { CreateUserUseCase }