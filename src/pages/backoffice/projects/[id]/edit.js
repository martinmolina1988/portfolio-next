import { getSession } from "next-auth/react";
import projectFormPage from "../new";

export default projectFormPage;
export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session?.user.name !== process.env.NEXT_PUBLIC_NAME_ID) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}
