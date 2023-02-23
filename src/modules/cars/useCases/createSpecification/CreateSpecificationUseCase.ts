import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository"

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
  //atributo
  private specificatioRepository: ISpecificationsRepository;
  //meu servico recebe um parametro
  constructor(specificatioRepository: ISpecificationsRepository) {
    //atribuo o parametro ao atributo
    this.specificatioRepository = specificatioRepository;
  }


  //funcao de criacao
  execute({ description, name }: IRequest): void {
    //verificar se ja existe uma espeficicacao com este nome
    const specificationAlreadyExists = this.specificatioRepository.findByName(name);
    if(specificationAlreadyExists) {
      throw new Error("Specification Already Exists!")
    }
    
    this.specificatioRepository.create({
      name, 
      description,
    })
  }
}

export { CreateSpecificationUseCase }