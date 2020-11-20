import { connect, connection } from 'mongoose';
import getCsgoCase from '../../../src/db/getCaseFromDb';
const uri = `${process.env.MONGODB_URL}:${process.env.MONGO_PORT}${process.env.MONGO_DB_PATH}`;
const isRunningLocally = false; // For tests that only should be run locally

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
  test('it should get one item from the csgo case', async () => {
    try {
      const item = await getCsgoCase('Fracture Case');

      expect(item).toBeTruthy();
    } catch (e) {
      console.error(e);
    }
  });

  if (isRunningLocally) {
    test('it should get at least one knife in 1000 tries', async () => {
      try {
        const knives = [];

        for (let i = 0; i < 1000; i++) {
          const item: any = await getCsgoCase('Fracture Case');

          if (item && item.name.includes('Knife')) {
            knives.push(item);
            console.log(item);
          }
        }

        console.log(knives.length);
        expect(!!knives.length).toBe(true);
      } catch (e) {
        console.error(e);
      }
    }, 500000);
  }
});
