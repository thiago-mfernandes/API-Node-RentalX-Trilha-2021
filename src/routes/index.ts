import { Router } from "express"
import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";

const router = Router();

//se eu passar o pathname como primeiro argumento, dentro das categoriesRoutes o pathname sempre sera categories e eu nao preciso escrever o path em toda rota la dentro do arquivo

router.use('/categories', categoriesRoutes)
router.use('/specifications', specificationsRoutes)

export { router }