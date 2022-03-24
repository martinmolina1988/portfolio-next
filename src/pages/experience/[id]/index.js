import React from 'react'
import { Grid } from 'semantic-ui-react'
import Error from 'next/error'
import { API_URL } from 'utils/url'

const Project = ({ data, error }) => {
  if (error && error.statusCode) { return <Error statusCode={error.statusCode} title={error.statusText} /> }

  return (
    <Grid
      centered
      verticalAlign="middle"
      columns="1"
      style={{ height: '80vh' }}
    >
      <Grid.Row>
        <Grid.Column textAlign="center">
          <div style={{ backgroundColor: 'rgba(0,0,0,0.7)', padding: '20px' }}>
            <h1>{data.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: data.description }} />
          </div>
        </Grid.Column>
      </Grid.Row>

    </Grid>
  )
}

export async function getServerSideProps ({ query: { id } }) {
  const nameEndpoint = 'experience'
  const res = await fetch(`${API_URL}/api/${nameEndpoint}/${id}`)

  if (res.status === 200) {
    const data = await res.json()

    return {
      props: {
        data
      }
    }
  }

  return {
    props: {
      error: {
        statusCode: res.status,
        statusText: 'Invalid Id'
      }
    }
  }
}

export default Project
