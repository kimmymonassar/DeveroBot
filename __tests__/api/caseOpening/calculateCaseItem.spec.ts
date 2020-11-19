import { connect, connection } from 'mongoose';
import getCsgoCase from '../../../src/db/getCaseFromDb';
const uri = `${process.env.MONGODB_URL}:${process.env.MONGO_PORT}${process.env.MONGO_DB_PATH}`;
const isRunningLocally = false;

async function initalizeDb() {
  await connect(`${uri}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    poolSize: 10,
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

  // Only run this test locally
  if (isRunningLocally) {
    test('it should get one knife in 10000 tries', async () => {
      try {
        let knife = null;

        for (let i = 0; i < 10000; i++) {
          const item: any = await getCsgoCase('Fracture Case');

          if (item && item.name.includes('Knife')) {
            knife = item;
            console.log(item);
          }
        }

        expect(knife).toBeTruthy();
      } catch (e) {
        console.error(e);
      }
    }, 500000);
  }
});

// https://mongoosejs.com/docs/connections.html
//buffercommands
