import { connect, connection } from 'mongoose';
import getCsgoCase from '../../../src/db/getCaseFromDb';
const uri = `${process.env.MONGODB_URL}:${process.env.MONGO_PORT}${process.env.MONGO_DB_PATH}`;

async function initalizeDb() {
  await connect(`${uri}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  console.log('MongoDB connection is up');
}

beforeAll(async () => {
  try {
    await initalizeDb();
  } catch (e) {
    console.error(`DB threw error in beforeAll: ${initalizeDb()}`);
  }
});

afterAll(async () => {
  await connection.close();
});

describe('calculateCaseItem.ts', () => {
  test('it should get one item from the csgo case', async () => {
    try {
      const item = await getCsgoCase('Fracture Case');
      console.log(JSON.stringify(item));

      expect(item).toBeTruthy();
    } catch (e) {
      console.error(e);
    }
  });
});
