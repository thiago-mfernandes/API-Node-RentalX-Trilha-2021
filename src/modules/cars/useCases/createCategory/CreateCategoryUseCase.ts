import { inject, injectable } from "tsyringe";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  //metodo responsavel por fazer tudo para que uma categoria seja criada com sucesso
  async execute({ description, name }: IRequest): Promise<void> {
    //verificar antes de criar algo, se esse algo ja existe:
    const categoryAlreadyExists = await this.categoriesRepository.findByName(name);
    if(categoryAlreadyExists) {
      //como meu service nao tem acesso a request e response, se eu tiver um erro:
      throw new Error("Category Already exists!")
    }

    //chamo meu repository que eh onde fica o metodo de manipulacao de dados, passando os parametros
    this.categoriesRepository.create({ name, description }) 
  }
}

export { CreateCategoryUseCase }