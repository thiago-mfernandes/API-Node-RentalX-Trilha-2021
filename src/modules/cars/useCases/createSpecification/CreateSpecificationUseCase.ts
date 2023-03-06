import { AppError } from "@shared/errors/AppError";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  //atributo
  
  //meu servico recebe um parametro
  constructor(
    @inject("SpecificationsRepository")
    private specificatioRepository: ISpecificationsRepository
  ) {}


  //funcao de criacao
  async execute({ description, name }: IRequest): Promise<void> {
    //verificar se ja existe uma espeficicacao com este nome
    const specificationAlreadyExists = await this.specificatioRepository.findByName(name);
    if(specificationAlreadyExists) {
      throw new AppError("Specification Already Exists!")
    }
    
    await this.specificatioRepository.create({
      name, 
      description,
    })
  }
}

export { CreateSpecificationUseCase }