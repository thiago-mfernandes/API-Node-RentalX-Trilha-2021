import { Router } from "express"
import { authenticateRoutes } from "./authenticate.routes";
import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

//se eu passar o pathname como primeiro argumento, dentro das categoriesRoutes o pathname sempre sera categories e eu nao preciso escrever o path em toda rota la dentro do arquivo

router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRoutes);
router.use('/users', usersRoutes);
router.use(authenticateRoutes);

export { router }