/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import react, { useEffect } from "react";
import { Container, Grid, GridColumn, GridRow } from "semantic-ui-react";

export default function Index({ me }) {
  const fecha =
    (new Date() - new Date("1988-07-27")) / (1000 * 60 * 60 * 24 * 365.24);

  const [screenWidth, setScreenWidth] = react.useState(1000);
  function onWidth() {
    setScreenWidth(window.innerWidth);
  }
  useEffect(() => {
    if (typeof window !== "undefined") {
      // browser code
      window.addEventListener("resize", onWidth);
    }
    setScreenWidth(window.innerWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <div className="sobremi" style={{ textAlign: "center" }}>
        <div
          style={{
            margin: " 10px 10px ",
            backgroundColor: "rgba(0,0,0,0.65)",
            padding: "20px",
            justifyContent: "center",
          }}
          className=" transparente animate__animated animate__fadeIn"
        >
          <h1>Sobre mí</h1>
          <p
            style={{
              width: "70%",
              margin: " 50px auto",
              fontWeight: "bold",
            }}
          >
            {me.description}
          </p>
        </div>
        <div className=" justify-content-center">
          <Grid
            style={{
              backgroundColor: "rgba(0,0,0,0.65)",
              color: "white",
              margin: " 0 10px ",
              padding: "50px 10px",
            }}
          >
            <GridRow className="transparente animate__animated animate__fadeIn">
              <GridColumn width={screenWidth > 700 ? 8 : 16}>
                <p>
                  <strong>Nombre:</strong> {me.name}
                </p>
                <p>
                  <strong>Edad: </strong>
                  {Math.trunc(fecha)} años
                </p>
                <p>
                  <strong>Nacionalidad: </strong> Argentina
                </p>
                <p>
                  <strong>Ciudad: </strong>Buenos Aires
                </p>
              </GridColumn>
              <GridColumn width={screenWidth > 700 ? 8 : 16}>
                <p>
                  <strong>Teléfono: </strong>
                  {me.phone}
                </p>
                <p>
                  <strong>Email: </strong>
                  {me.email}
                </p>
                <p>
                  <strong>Github: </strong>
                  <a href={me.github} target="_blank" rel="Github noreferrer">
                    {me.github}
                  </a>
                </p>
                <p>
                  <strong>Linkedin: </strong>
                  <a
                    href={me.linkedin}
                    target="_blank"
                    rel="Linkedin noreferrer"
                  >
                    {me.linkedin}
                  </a>
                </p>
              </GridColumn>
            </GridRow>
          </Grid>
        </div>
      </div>
    </Container>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/me");
  const data = await res.json();
  const me = data[0];

  return {
    props: {
      me,
    },
  };
}
