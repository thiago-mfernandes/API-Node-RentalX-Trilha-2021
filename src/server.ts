import 'reflect-metadata'
import express from 'express'
import swaggerUi from 'swagger-ui-express'
import { router } from './routes';
import swaggerFile from './swagger.json'

import { AppDataSource } from './database'

AppDataSource.initialize().then(() => {

  const app = express();
  
  app.use(express.json());
  
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
  app.use(router);
  
  return app.listen(process.env.PORT, () => {
    console.log("Server is running!")
  })
})
