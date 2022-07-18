import mongoose from 'mongoose'
import './env'

const username = process.env.MONGODB_USER || ''
const password = process.env.MONGODB_PASS || ''

let dbURI = ''

if (process.env.MONGODB_URI) {
  dbURI = process.env.MONGODB_URI
} else dbURI = `mongodb://${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}?retryWrites=false`

let environment = process.env.NODE_ENV || 'development'
environment = environment.trim()

const databaseConfig: mongoose.ConnectOptions = {
  auth: { username, password },
  keepAlive: true,
}

export class MongoDBDatabaseManager {
  connection: typeof mongoose | undefined

  async createMongoConnection(logger = console): Promise<void> {
    logger.debug('Trying to create db connection')
    if (environment === 'development') {
      mongoose.set('debug', true)
    }
    return mongoose
      .connect(dbURI, databaseConfig)
      .then((conn) => {
        logger.debug('Made a DB connection')
        this.connection = conn
      })
      .catch((error) => {
        logger.debug('Encountered an error')
        logger.debug(error)
        throw error
      })
  }
}

export default new MongoDBDatabaseManager()
