import { Request, Response } from "express";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController{
  //

  //
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {
    //criar uma instancia de servico, passando meu repository como parametro
  }

  //metodo handle manipula
  handle(req: Request, res: Response): Response {
    //recebo as informacoes do front
  const { name, description } = req.body;
  
  //executar
  this.createCategoryUseCase.execute({ name, description })

  return res.status(201).send();
  }
}

export { CreateCategoryController }