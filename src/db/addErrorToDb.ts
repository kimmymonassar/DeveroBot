import Error from '../models/error.model';
import { logSuccess } from '../api/logUtil';
export default async function createOrGetUser(error: string, type: string) {
  try {
    const newError = new Error({
      type,
      error,
    });

    await newError.save();

    logSuccess(`Succsessfully added error to DB`);
  } catch (e) {
    console.error(`Couldnt add error to DB: ${e}`);
  }
}
