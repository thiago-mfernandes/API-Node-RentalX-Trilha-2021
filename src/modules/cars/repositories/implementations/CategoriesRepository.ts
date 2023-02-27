import { Category } from "../../entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";


class CategoriesRepository implements ICategoriesRepository {
  //tenho um atributo categories do tipo da classe Category
  //somente meu repositorio tem acesso ao atributo categories, somente ele pode manipular esse atributo
  private categories: Category[];

  private static INSTANCE: CategoriesRepository;

  //inicializo minha categories sob a responsabilidade do construtor. Quando uma instancia de categories for iniciada, um novo array vazio do tipo Category será iniciado

  //posteriormente, somente minha classe pode instanciar um CategoriesRepository
  private constructor() {
    this.categories = [];
  }

  public static getInstance(): CategoriesRepository {
    if(!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository()
    }
    return CategoriesRepository.INSTANCE;
  }

  //funcao responsavel por cadastrar a nossa categoria, recebendo por parametro minhas informacoes
  create({ name, description }: ICreateCategoryDTO) {
    //preciso instanciar minha variavel pra que o construtor seja chamado
    const category = new Category();
    //utilizo essa funcao para atribuir os valores a minha instancia de category. 
    Object.assign(category, { 
      name, 
      description,
      created_at: new Date()
    })
    this.categories.push(category)
  }

  //funcao para listar todas as categorias da nossa tabela
  list(): Category[] {
    return this.categories;
  }

  //funcao que verifica se a categoria ja existe no meu array pra que nao seja duplicado
  findByName(name: string): Category {
    const isCategoryExist = this.categories.find(category => category.name === name);
    return isCategoryExist;
  }
}





export { CategoriesRepository }