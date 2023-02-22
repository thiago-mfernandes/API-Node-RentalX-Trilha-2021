import { v4 as uuidV4 } from "uuid";


class Category {
  //atributos|propriedades
  id?: string;
  name: string;
  description: string;
  created_at: Date;

  //construtor 
  constructor() {
    if(!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Category }