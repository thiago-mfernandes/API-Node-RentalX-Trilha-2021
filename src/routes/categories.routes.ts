import { Router } from 'express'
import { CategoriesRepository } from '../modules/cars/repositories/CategoriesRepository';
import { CreateCategoryService } from '../modules/cars/services/CreateCategoryService';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

//atribuir a rota apenas a responsabilidade de receber as informacoes, chamar seus outros reponsaveis e retornar uma resposta. Validacoes, criacao, edicao, etc, precisa ser responsabilidade de outras compentencias

//o pathname foi passado como parametro la no server
categoriesRoutes.post('/', (req, res) => {
  //recebo as informacoes do front
  const { name, description } = req.body;
  //criar uma instancia de servico, passando meu repository como parametro
  const createCategoryService = new CreateCategoryService(categoriesRepository);
  //executar
  createCategoryService.execute({ name, description })

  return res.status(201).send();
})

categoriesRoutes.get('/', (req, res) => {
  //chamo meu metodo de listagem
  const allCategories = categoriesRepository.list();
  return res.json(allCategories);
})


export { categoriesRoutes };

/**
 * O que é um repositório?
 * 
 * Uma camada, uma classe que eh responsavel por fazer toda a manipulacao de dados da nossa aplicacao. Sao responsaveis por fazer o acesso ao banco de dados, o insert, os selects...etc, todas as manipulacoes com o banco de dados,
 * 
 * As rotas nao devem ter a responsabilidade de comunicar-se com o banco de dados
 */