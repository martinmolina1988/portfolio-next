import Stars from "components/Stars";
import { map } from "lodash";
import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { API_URL } from "utils/url";

export default function index(props) {
  const { data } = props;
  return (
    <div>
      <h2
        style={{
          margin: "10px",
          padding: "15px",
          textAlign: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        Las siguientes herramientas son las que utilizo mas con mayor
        frecuencia:
      </h2>
      <Card.Group style={{ margin: "10px" }}>
        {map(data, (element, index) => (
          <>
            <Card
              style={{
                backgroundColor: "rgba(0,0,0,0.5)",
                boxShadow: "0 1px 3px 0 black",
              }}
            >
              <Image src={element.image.secure_url} alt="" wrapped ui={false} />
              <Card.Content>
                <Card.Header style={{ color: "white" }}>
                  {element.name}
                </Card.Header>
                <Card.Description style={{ color: "white" }}>
                  {element.description}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Stars value={element.value} />
              </Card.Content>
            </Card>
          </>
        ))}
      </Card.Group>
    </div>
  );
}
export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/api/skills`);
  const data = await res.json();

  return {
    props: { data },
  };
}
