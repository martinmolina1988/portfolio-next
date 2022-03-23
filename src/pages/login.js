import { signIn, getSession } from "next-auth/react";

export default function LoginPage() {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px",
        backgroundColor: "rgba(0,0,0,0.5)",
        padding: "50px",
      }}
    >
      <h1>login</h1>
      <button onClick={() => signIn("github")}>Login with Github</button>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
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
