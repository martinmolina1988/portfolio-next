import Stars from 'components/Stars'
import { map } from 'lodash'
import React from 'react'
import { Card, Container, Image } from 'semantic-ui-react'
import { API_URL } from 'utils/url'
import style from './skill.module.css'
export default function index (props) {
  const { data } = props
  return (
    <div>
      <h2
        className={style.cardTitle}
      >
        Las siguientes herramientas son las que utilizo mas con mayor
        frecuencia:
      </h2>
      <Container className={style.center}>
      <Card.Group style={{ justifyContent: 'center' }} >
        {map(data, (element, index) => (
            <Card key={index}
            className={style.cardGroup}
            >
              <Image src={element.image.secure_url} alt="" wrapped ui={false} />
              <Card.Content>
                <Card.Header style={{ color: 'white' }} >
                  {element.name}
                </Card.Header>
                <Card.Description style={{ color: 'white' }}>
                  {element.description}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Stars value={element.value} />
              </Card.Content>
            </Card>
        ))}
      </Card.Group>
      </Container>
    </div>
  )
}
export async function getServerSideProps () {
  const res = await fetch(`${API_URL}/api/skills`)
  const data = await res.json()

  return {
    props: { data }
  }
}
