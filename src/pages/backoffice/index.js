/* eslint-disable @next/next/link-passhref */
import { map } from "lodash";
import { getSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { Accordion, Button, Icon, Segment } from "semantic-ui-react";
import { API_URL } from "utils/url";

function Table({ array, type }) {
  return (
    <table
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        margin: "auto",
        padding: "30px",
      }}
    >
      <tr>
        <th>Nombre</th>
        <th>Editar</th>
        <th>Eliminar</th>
      </tr>

      {type !== "me" ? (
        map(array, (element, index) => (
          <tr>
            <td>{element.title ? element.title : element.name}</td>
            <td>
              <Link
                href={`/backoffice/${type}/${
                  type === "projects" ? element.title : element._id
                }/edit`}
              >
                <Button color={"green"}>Editar</Button>
              </Link>
            </td>
            <td>
              <Button color={"red"}>Eliminar</Button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td>{array.name}</td>
          <td>
            <Link href={`/backoffice/${type}/${array._id}/edit`}>
              <Button color={"green"}>Editar</Button>
            </Link>
          </td>
          <td>
            <Button color={"red"}>Eliminar</Button>
          </td>
        </tr>
      )}
    </table>
  );
}

export default function BackOffice({
  backofficeData: { me, experiences, projects, skills },
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex);
  };
  return (
    <div style={{ justifyContent: "center" }}>
      <Accordion inverted>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={handleClick}
        >
          <Icon name="dropdown" />
          Experiences
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <Table array={experiences} type={"experience"} />
        </Accordion.Content>
        <Accordion.Title
          active={activeIndex === 1}
          index={1}
          onClick={handleClick}
        >
          <Icon name="dropdown" />
          Skills
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          <Table array={skills} type={"skills"} />
        </Accordion.Content>
        <Accordion.Title
          active={activeIndex === 2}
          index={2}
          onClick={handleClick}
        >
          <Icon name="dropdown" />
          Projects
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 2}>
          <Table array={projects} type={"projects"} />
        </Accordion.Content>
        <Accordion.Title
          active={activeIndex === 3}
          index={3}
          onClick={handleClick}
        >
          <Icon name="dropdown" />
          Perfil
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 3}>
          <Table array={me} type={"me"} />
        </Accordion.Content>
      </Accordion>
    </div>
  );
}
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
  const res = await fetch(`${API_URL}/api/backoffice`);
  if (res.status === 200) {
    const backofficeData = await res.json();
    return {
      props: {
        backofficeData,
      },
    };
  }
}
