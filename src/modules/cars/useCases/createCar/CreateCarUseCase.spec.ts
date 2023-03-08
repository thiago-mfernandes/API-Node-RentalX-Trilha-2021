import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase"


let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  })

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      brand: "brand",
      category_id: "category",
      daily_rate: 100,
      description: "Description car", 
      fine_amount: 60,
      license_plate: "ABC-1234",
      name: "Name car"
    });

    expect(car).toHaveProperty("id");
  })

  it("should not to be able to create a car if it already exists", () => {
    expect(async() => {
      await createCarUseCase.execute({
        brand: "brand",
        category_id: "category",
        daily_rate: 100,
        description: "Description car", 
        fine_amount: 60,
        license_plate: "ABC-1234",
        name: "Car1"
      });

      await createCarUseCase.execute({
        brand: "brand",
        category_id: "category",
        daily_rate: 100,
        description: "Description car", 
        fine_amount: 60,
        license_plate: "ABC-1234",
        name: "Car2"
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create a car with available property true by default", async() => {
    const car = await createCarUseCase.execute({
      brand: "brand",
      category_id: "category",
      daily_rate: 100,
      description: "Description car", 
      fine_amount: 60,
      license_plate: "ABCD-1234",
      name: "Car Available"
    });

    console.log(car);
    
    
    //teste retornou undefined pela primera vez pq na classe Car, o id, available e created_at nao estavam sendo preenchidos com nenhum valor. Foi implementado um constructor
    expect(car.available).toBe(true);
  });
})