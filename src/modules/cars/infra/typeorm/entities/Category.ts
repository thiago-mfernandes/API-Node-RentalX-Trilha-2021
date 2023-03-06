
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

//entity(tabela)
@Entity('categories')
class Category {
  //atributos|propriedades

  //referencia da tabela categories coluna name
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  //referencia da tabela categories coluna name
  @Column({ type: 'varchar', unique: true })
  name: string;

//referencia da tabela categories coluna description
  @Column({ type: 'varchar' })
  description: string;

//referencia da tabela categories coluna created_at
  @CreateDateColumn()
  created_at: Date;

  //construtor 
  constructor() {
    if(!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Category }