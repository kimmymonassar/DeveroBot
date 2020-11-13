import Error from '../models/error.model';
import { logSuccess } from '../api/util/logUtil';
export default async function createOrGetUser(error: string, type: string) {
  try {
    const newError = new Error({
      timestamp: new Date(),
      type,
      error,
    });

    await newError.save();

    logSuccess(`Succsessfully added error to DB`);
  } catch (e) {
    console.error(`Couldnt add error to DB: ${e}`);
  }
}
