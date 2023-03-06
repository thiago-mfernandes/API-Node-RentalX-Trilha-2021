import { inject, injectable } from "tsyringe";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";


interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  }
  token: string;
}

@injectable()
class AuthenticateUserUseCase{
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {   

    // verificar se usuario existe
    const user = await this.usersRepository.findByEmail(email);
    if(!user) {
      throw new AppError("Email or password incorrect");
    }
    // verificar se a senha esta correta
    const passwordMatch = await compare(password, user.password);
    if(!passwordMatch) {
      throw new AppError("Email or password incorrect");
    }
    // gerar um jwt

    //segundo parametro gerar um md5 aletorio: https://www.md5hashgenerator.com/
    const token = sign({}, "0c59bbdaaea155ac138721e69a4035ea", {
      subject: user.id,
      expiresIn: "1d",
    });

    const tokenResponse: IResponse = {
      token, 
      user: {
        name: user.name,
        email: user.email,
      }
    }

    return tokenResponse;
  }
}

export { AuthenticateUserUseCase }