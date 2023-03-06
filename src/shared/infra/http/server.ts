import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express'
import "express-async-errors"
import swaggerUi from 'swagger-ui-express'
import cors from 'cors'

import "@shared/container"
import swaggerFile from '../../../swagger.json'
import { AppDataSource } from '@shared/infra/typeorm/data-source'
import { AppError } from '@shared/errors/AppError'
import { router } from '@shared/infra/http/routes'


AppDataSource.initialize().then(() => {

  const app = express();
  app.use(cors());  
  app.use(express.json());
  
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
  app.use(router);
  
  //npm i express-async-errors
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof AppError) {
      return res.status(err.statusCode).json({
        message: err.message
      })
    }

    return res.status(500).json({
      status: "Error",
      message: `Internal Server error - ${err.message}`
    })
  })
  
  return app.listen(3333, () => {
    console.log("Server is running!")
  })
})
