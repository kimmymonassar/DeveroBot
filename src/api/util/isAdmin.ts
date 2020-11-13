import Admin from '../../models/admin.model';
export function isOwner(id: any) {
  return process.env.OWNER_ID === id;
}

export async function isAdmin(id: any) {
  const user = await Admin.findOne({ id });
  console.log(user);
  return user || false;
}
