import { ICategoriesRepository } from "../repositories/ICategoriesRepository";


interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryService {
  //propriedade
  private categoriesRepository: ICategoriesRepository;

  constructor(categoriesRepository: ICategoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  //metodo responsavel por fazer tudo para que uma categoria seja criada com sucesso
  execute({ description, name }: IRequest):void {
    //verificar antes de criar algo, se esse algo ja existe:
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);
    if(categoryAlreadyExists) {
      //como meu service nao tem acesso a request e response, se eu tiver um erro:
      throw new Error("Category Already exists!")
    }

    //chamo meu repository que eh onde fica o metodo de manipulacao de dados, passando os parametros
    this.categoriesRepository.create({ name, description }) 
  }
}

export { CreateCategoryService }