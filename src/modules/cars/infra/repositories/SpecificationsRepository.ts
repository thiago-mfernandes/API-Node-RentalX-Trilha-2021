import { Repository } from "typeorm";
import { ISpecificationsRepository, ICreateSpecificationDTO } from "@modules/cars/repositories/ISpecificationsRepository";
import { Specification } from "../typeorm/entities/Specification";
import { AppDataSource } from "@shared/infra/typeorm/data-source";


class SpecificationsRepository implements ISpecificationsRepository {

  private repository: Repository<Specification>

  constructor() {
    this.repository = AppDataSource.getRepository(Specification)
  }

    
  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      description,
      name
    })

    await this.repository.save(specification)
  }

  async findByName(name: string): Promise<Specification> {
    const specification = this.repository.findOne({ where: { name }})
    return specification;
  }

}

export { SpecificationsRepository }