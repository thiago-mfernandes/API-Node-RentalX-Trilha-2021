import { Request, Response } from "express";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";
import { container } from "tsyringe"

class CreateSpecificationController {

  async handle(req: Request, res: Response): Promise<Response> {

    const { description, name } = req.body;
    const createSpecificationUseCase = container.resolve(CreateSpecificationUseCase);
    
    await createSpecificationUseCase.execute({ description, name });

    return res.status(201).send();
  }
}

export { CreateSpecificationController }