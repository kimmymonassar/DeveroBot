import { connect, connection } from 'mongoose';
import { logSuccess, logError, logFatal } from '../api/util/logUtil';

const uri = `${process.env.MONGODB_URL}:${process.env.MONGO_PORT}${process.env.MONGO_DB_PATH}`;

export default class dbConnection {
  private static _instance: dbConnection = new dbConnection();

  constructor() {
    if (dbConnection._instance) {
      throw new Error('Error: Instantiation failed: Use dbConnection.getInstance() instead of new.');
    }
    dbConnection._instance = this;

    try {
      connect(`${uri}`, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        poolSize: 10,
      });
      logSuccess('MongoDB connection is up');
    } catch (e) {
      logError(`${e.message}. Something is wrong, server could not start`);
    }

    process.on('SIGINT', () => {
      connection.close(() => {
        logFatal('Mongoose disconnected on app termination');
        process.exit(0);
      });
    });
  }

  public static getInstance(): dbConnection {
    return dbConnection._instance;
  }
}
