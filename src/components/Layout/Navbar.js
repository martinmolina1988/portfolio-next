/* eslint-disable @next/next/no-img-element */
import { Menu, Button, Icon } from "semantic-ui-react";
import { signIn, useSession, signOut } from "next-auth/react";
import { useTasks } from "context/TasksContext";
export const Navbar = ({ screenWidth }) => {
  const { visible, setVisible } = useTasks();
  const { data } = useSession();
  return (
    <>
      <Menu inverted>
        {screenWidth < 1000 && (
          <Menu.Item name="home">
            <i
              className="bars icon"
              style={{ cursor: "pointer" }}
              onClick={() => setVisible(!visible)}
            ></i>
          </Menu.Item>
        )}
        <Menu.Menu position="right">
          <Menu.Item>
            {!data ? (
              <Button size="mini" primary onClick={() => signIn("github")}>
                <Icon color="yellow" name="github" /> Login
              </Button>
            ) : (
              <Button size="mini" primary onClick={() => signOut()}>
                Logout
              </Button>
            )}
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </>
  );
};
