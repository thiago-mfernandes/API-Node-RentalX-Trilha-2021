import 'reflect-metadata'
import express from 'express'
import swaggerUi from 'swagger-ui-express'
import cors from 'cors'

import { AppDataSource } from './database/data-source'
import "./shared/container"
import { router } from './routes';
import swaggerFile from './swagger.json'


AppDataSource.initialize().then(() => {

  const app = express();
  app.use(cors());  
  app.use(express.json());
  
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
  app.use(router);
  
  return app.listen(3333, () => {
    console.log("Server is running!")
  })
})
