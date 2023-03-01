import { Request, Response } from "express";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";
import { container } from "tsyringe"

class ListCategoriesController {
  

  async handle(req: Request, res: Response): Promise<Response> {
  const listCategoriesUseCase = container.resolve(ListCategoriesUseCase)
    //chamo meu metodo de listagem
    const allCategories = await listCategoriesUseCase.execute();
    return res.json(allCategories);
  }
}

export { ListCategoriesController }