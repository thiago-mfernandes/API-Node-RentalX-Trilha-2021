import { AppError } from "../../../../errors/AppError";
import { CategoriesRespositoryInMemory } from "../../repositories/in-memory/CategoriesRespositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase"

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRespositoryInMemory

describe("Create Category", () => {
  //preciso criar um repositorio em memoria(salvar dados em um array) e passar pro meu useCase esse repositorio;

  beforeAll(() => {
    categoriesRepositoryInMemory = new CategoriesRespositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
  })

  it("should be able to create a new category", async () => {
    //dados fake
    const category = {
      name: "Category Test",
      description: "Category description Test",
    }
    //chamo o metodo de criacao passando os valores fake
    await createCategoryUseCase.execute({
      name: "Category Test",
      description: "Category description Test",
    });
    //verifico se os valores foram criados no repositorio em memoria
    const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);

    //se a categoria foi de fato criada, ela possui id
    expect(categoryCreated).toHaveProperty("id")
  })

  it("should not be able to create a new category with the same name", async () => {
    expect(async() => {
      //dados fake
      const category = {
        name: "Category Test",
        description: "Category description Test",
      };
      //chamo o metodo de criacao passando os valores fake
      await createCategoryUseCase.execute({
        name: "Category Test",
        description: "Category description Test",
      });
      //nessa segunda vez tem que dar erro, porque lá no CreateCategoryUseCase existe uma verificacao de duplicidade e vai lancar um apperror
      await createCategoryUseCase.execute({
        name: "Category Test",
        description: "Category description Test",
      });
    }).rejects.toBeInstanceOf(AppError);   
  });
});