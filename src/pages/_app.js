import { Layout } from "../components/Layout/Layout";
import { SessionProvider, useSession } from "next-auth/react";
import { TasksProvider } from "context/TasksContext";
import "semantic-ui-css/semantic.min.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider>
      <TasksProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </TasksProvider>
    </SessionProvider>
  );
}

export default MyApp;
