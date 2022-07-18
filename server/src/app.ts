import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import swaggerUi from 'swagger-ui-express'
import cors from 'cors'
import mongoDbManager from './mongoose'
import { RegisterRoutes } from './routes/routes'
import swaggerJson from '../swagger.json'
import { logger } from './shared/logger'
// import databaseManager from './database'

class App {
  public app: express.Application
  private port: number = parseInt(process.env.PORT as string) || 3001
  private logger = logger

  constructor() {
    this.app = express()
    this.config()
  }

  private async createMongoDBConnection(): Promise<void> {
    this.logger.info('App is creating MongoDB connection')
    return mongoDbManager.createMongoConnection()
  }

  private config(): void {
    this.app.use(cors())
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: false }))
    this.app.use(
      '/api-docs',
      swaggerUi.serve,
      // eslint-disable-next-line no-unused-vars
      async (_req: Request, res: Response) => {
        return res.send(swaggerUi.generateHTML(swaggerJson))
      },
    )
    RegisterRoutes(this.app)
  }

  public start(): void {
    this.createMongoDBConnection()
    this.app.listen(this.port, () => {
      this.logger.info(`App has started on port: ${this.port}`)
    })
  }
}

export default App
