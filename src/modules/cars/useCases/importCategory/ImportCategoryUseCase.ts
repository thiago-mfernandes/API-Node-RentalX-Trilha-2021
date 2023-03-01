import fs from 'fs'
import { parse as csvParse } from "csv-parse";
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import { inject, injectable } from 'tsyringe';

/**
 * meu arquivo file tem a seguinte estrutura:
 * [ 'SUV', 'Utilitário esportivo' ]
   [ 'Sedan', 'Automóvel de três volumes' ]       
   [ 'Hatch', 'Carro curto' ]

    um array com dois campos. Entao crio uma const categories
 */

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRespository: ICategoriesRepository
  ) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    //la embaixo no return, vou ter um return [] vazio, pois o carregamento do arquivo nao terminou de ser executado, entao preciso retornar uma promise
    return new Promise((resolve, reject) => {
      //criando uma stram de leitura. Minha fn createReadStream recebe o path do arquivo
      const stream = fs.createReadStream(file.path);

      const categories: IImportCategory[] = [];
    
      const parseFile = csvParse();
    
      //fn pipe pega o que esta sendo lido, parte a parte, e coloca em um lugar
      stream.pipe(parseFile);
    
      //entao aqui ele coloca cada posicao nas chaves:
      //['name', 'description']
      parseFile.on('data', async(line) => {
        const [ name, description ] = line;
        categories.push({
          name, 
          description
        })
      })
        //qdo o arquivo terminar de ser lido
        .on('end', () => {
          fs.promises.unlink(file.path); //remove o arquivo do tmp
          //return categories
          resolve(categories)
        })
        .on('error', (err) => {
          reject(err)
        })
      })
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);
    
    categories.map(async(category) => {
      const { description, name } = category;
      //procuro se existe essa lista, mesmo que seja outro arquivo
      const existCategory = await this.categoriesRespository.findByName(name);

      if(!existCategory) {
        await this.categoriesRespository.create({
          name, description
        })
      }
    })
  }
}

export { ImportCategoryUseCase }