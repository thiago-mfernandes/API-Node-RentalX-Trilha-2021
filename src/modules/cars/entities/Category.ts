
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

//entity(tabela)
@Entity('categories')
class Category {
  //atributos|propriedades

  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'timestamp', default: 'now()'})
  created_at: Date;

  //construtor 
  constructor() {
    if(!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Category }