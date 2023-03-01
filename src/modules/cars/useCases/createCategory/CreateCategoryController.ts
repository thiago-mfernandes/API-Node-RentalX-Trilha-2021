import { Request, Response } from "express";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
import { container } from "tsyringe"


class CreateCategoryController{
  
  async handle(req: Request, res: Response): Promise<Response> {
    //recebo as informacoes do front
    const { name, description } = req.body;

    //instancio com injecao
    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);
        
    //executar
    await createCategoryUseCase.execute({ name, description })

    return res.status(201).send();
  }
}

export { CreateCategoryController }