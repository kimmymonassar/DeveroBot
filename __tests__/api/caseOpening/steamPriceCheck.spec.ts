import { connect, connection } from 'mongoose';
import getCsgoCase from '../../../src/db/getCaseFromDb';
import getPrice from '../../../src/api/caseOpening/steamPriceCheck';
const uri = `${process.env.MONGODB_URL}:${process.env.MONGO_PORT}${process.env.MONGO_DB_PATH}`;

async function initalizeDb() {
  await connect(`${uri}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    poolSize: 20,
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
  test('it should be able to get steam market prices', async () => {
    try {
      const errors = [];

      for (let i = 0; i < 5; i++) {
        const item: any = await getCsgoCase('Operation Broken Fang Case');
        // console.log(item);
        const price = await getPrice(item.name, item.wear, item.grade, item.statTrak);

        if (!price.lowest && !price.median) {
          errors.push(item);
        }
      }

      expect(!!errors.length).toBe(false);
    } catch (e) {
      console.error(e);
    }
  }, 50000);
});
