
import { ICategoriesRepository, ICreateCategoryDTO } from "@modules/cars/repositories/ICategoriesRepository";
import { AppDataSource } from "@shared/infra/typeorm/data-source";
import { Repository } from "typeorm";
import { Category } from "../typeorm/entities/Category";


class CategoriesRepository implements ICategoriesRepository {
  //tenho um atributo categories do tipo da classe Category
  //somente meu repositorio tem acesso ao atributo categories, somente ele pode manipular esse atributo
  private repository: Repository<Category>;
  
  //inicializo minha categories sob a responsabilidade do construtor. Quando uma instancia de categories for iniciada, um novo array vazio do tipo Category será iniciado

  //posteriormente, somente minha classe pode instanciar um CategoriesRepository
  constructor() {
    this.repository = AppDataSource.getRepository(Category);
  }

  //funcao responsavel por cadastrar a nossa categoria, recebendo por parametro minhas informacoes
  async create({ name, description }: ICreateCategoryDTO): Promise<void> {    
    const category = this.repository.create({
      description,
      name
    });

    await this.repository.save(category);
  }

  //funcao para listar todas as categorias da nossa tabela
  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  //funcao que verifica se a categoria ja existe no meu array pra que nao seja duplicado
  async findByName(name: string): Promise<Category> {
    //select * from categories where name = 'name'
    const category = await this.repository.findOne({ where: { name }});
    return category;
  }
}





export { CategoriesRepository }