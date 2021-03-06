import react, { useEffect } from 'react'
import { Container, Grid, GridColumn, GridRow } from 'semantic-ui-react'
import { API_URL } from 'utils/url'
import styles from './index.module.css'
export default function Index ({ me }) {
  const fecha =
    (new Date() - new Date('1988-07-27')) / (1000 * 60 * 60 * 24 * 365.24)

  const [screenWidth, setScreenWidth] = react.useState(1000)
  function onWidth () {
    setScreenWidth(window.innerWidth)
  }
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // browser code
      window.addEventListener('resize', onWidth)
    }
    setScreenWidth(window.innerWidth)
  }, [])

  return (
    <Container>
      <div className="sobremi" style={{ textAlign: 'center' }}>
        <div
          className= {styles.transparente}
        >
          <h1>Sobre mí</h1>
          <p
            style={{
              width: '70%',
              margin: ' 50px auto',
              fontWeight: 'bold'
            }}
          >
            {me.description}
          </p>
        </div>
        <div className={styles.transparente}>
          <Grid

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
  )
}

export async function getServerSideProps () {
  const res = await fetch(`${API_URL}/api/me`)
  const data = await res.json()
  const me = data[0]

  return {
    props: {
      me
    }
  }
}
