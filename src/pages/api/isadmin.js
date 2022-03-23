import { getSession } from "next-auth/react";

export default async function isAdmin(req, res) {
  const session = await getSession({ req });
  if (session?.user.name !== process.env.NEXT_PUBLIC_NAME_ID) {
    return false;
  }
  return true;
}
