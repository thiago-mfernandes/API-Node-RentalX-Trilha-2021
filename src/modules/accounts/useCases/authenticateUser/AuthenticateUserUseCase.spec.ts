import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";



let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {

    beforeEach(() => {
      //sempre preciso ter um usuario criado antes de cada teste
      usersRepositoryInMemory = new UsersRepositoryInMemory();
      authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
      createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });


  it("Should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "000123",
      email: "user@teste.com",
      password: "1234",
      name: "User Test"
    };

    //começo criando o usuario
    await createUserUseCase.execute(user);
    //fazer a autenticacao
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    })

    //ver resultado
    // console.log(result)

    expect(result).toHaveProperty("token")
  });

  it("should not be able to authenticate an non-existent user", () => {
    expect(async () => {
      //fazer a autenticacao
      await authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "1234"
      })
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate awith incorrect password", () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: "9999",
        email: "user@user.com",
        password: "1234",
        name: "User Test Error"
      };
      //começo criando o usuario
      await createUserUseCase.execute(user);

      //fazer a autenticacao
      await authenticateUserUseCase.execute({
        email: user.email,
        password: "incorrectPassword"
      })
    }).rejects.toBeInstanceOf(AppError);
  })
})