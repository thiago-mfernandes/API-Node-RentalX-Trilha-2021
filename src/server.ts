import express from 'express'
import { categoriesRoutes } from './routes/categories.routes';
import { specificationsRoutes } from './routes/specifications.routes';

const app = express();

app.use(express.json())

//se eu passar o pathname como primeiro argumento, dentro das categoriesRoutes o pathname sempre sera categories e eu nao preciso escrever o path em toda rota la dentro do arquivo
app.use("/categories", categoriesRoutes);
app.use("/specifications", specificationsRoutes);

app.listen(3333, () => {
  console.log("Server is running!")
})