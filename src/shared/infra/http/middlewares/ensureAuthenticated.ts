import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/repositories/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  //Bearer n9563t5int548y56jyt54vg54
  
  //acessar o header para pegar o token
  
  //receber o token
  const authHeader = req.headers.authorization;

  if(!authHeader) {
    throw new AppError("Token missing", 401);
  }

  //desestruturar
  //na posicao [0] = Bearer
  //na posicao [1] = n9563t5int548y56jyt54vg54

  //ignorar a posicao 0 e colocar a posicao 1 na variavel token

  const [ , token] = authHeader.split(" ");
  
  try {
    const { sub: user_id } = verify(token, "0c59bbdaaea155ac138721e69a4035ea") as IPayload;
    //verificar se o usuario esta no banco de dados

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);

    if(!user) {
      throw new AppError("User does not exists!", 401);      
    }

    //aqui eu passo a informacao pra frente
    req.user = {
      id: user_id
    }

    next();
  } catch {
    throw new AppError("Invalid token!", 401);    
  }

}