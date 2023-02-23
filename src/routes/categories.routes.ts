import { Router } from 'express';
import { createCategoryController } from '../modules/cars/useCases/createCategory';
import { listCategoriesController } from '../modules/cars/useCases/listCategories';
import multer from 'multer'
import { importCategoryController } from '../modules/cars/useCases/importCategory';

const categoriesRoutes = Router();

//atribuir a rota apenas a responsabilidade de receber as informacoes, chamar seus outros reponsaveis e retornar uma resposta. Validacoes, criacao, edicao, etc, precisa ser responsabilidade de outras compentencias


const upload = multer({
  //configuracoes do multer. Salvar os dados numa pasta temporaria, fazer a leitura e insercao no banco de dados e remover o arquivo temporario

  //pasta de destino
  dest: './tmp',
})

//o pathname foi passado como parametro la no server
categoriesRoutes.post('/', (req, res) => {
  return createCategoryController.handle(req, res);
})

categoriesRoutes.get('/', (req, res) => {
  return listCategoriesController.handle(req, res);
})

//single(nome que vou dar ao meu arquivo que vai ser lido)
categoriesRoutes.post('/import', upload.single('file'), (req, res) => {
  return importCategoryController.handle(req, res);
})


export { categoriesRoutes };

/**
 * O que é um repositório?
 * 
 * Uma camada, uma classe que eh responsavel por fazer toda a manipulacao de dados da nossa aplicacao. Sao responsaveis por fazer o acesso ao banco de dados, o insert, os selects...etc, todas as manipulacoes com o banco de dados,
 * 
 * As rotas nao devem ter a responsabilidade de comunicar-se com o banco de dados
 * 
 * 
 * O que é um Controller?
 * 
 * Classes que recebem nossa requisicao e retornar a resposta pra quem chamou
 */