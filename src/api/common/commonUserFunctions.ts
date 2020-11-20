import createOrGetUser from '../../db/createOrGetUser';
import updateUserTimestamp from '../../db/updateUserTimestamp';

export async function handleUser(message: Record<string, any>) {
  return createOrGetUser(message);
}

export async function handleUserTimestamp(message: Record<string, any>) {
  await updateUserTimestamp(message, new Date().getTime());
}

export default async function handleUserValues(message: Record<string, any>) {
  await handleUser(message);
  await handleUserTimestamp(message);
}
