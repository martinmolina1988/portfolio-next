/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react'
import Error from 'next/error'
import { API_URL } from 'utils/url'
import Carousels from '../Carousels'
import styles from './Project.module.css'
const Project = ({ data, error }) => {
  const [mount, setMount] = useState(false)
  useEffect(() => {
    setMount(true)
  }, [])

  const { back_technologies, description, front_technologies, title, images } =
    data[0]

  if (error && error.statusCode) {
    return <Error statusCode={error.statusCode} title={error.statusText} />
  }

  return (
    <>
      <div className={styles.project}>
        <p className="center">
          {' '}
          <strong> {title}</strong>
        </p>
        <p>
          <strong>Tecnologías utilizadas:</strong>
        </p>
        <p>
          <strong>Frontend:</strong> {front_technologies}
        </p>
        <p>
          <strong>Backend:</strong> {back_technologies}
        </p>
        {mount && <div dangerouslySetInnerHTML={{ __html: description }} />}
      </div>

      <div className="transparente animate__animated animate__fadeIn">
        <div className={styles.galeria}>{mount && <Carousels images={images} />}</div>
      </div>
    </>
  )
}

export async function getServerSideProps ({ query: { id } }) {
  const res = await fetch(`${API_URL}/api/projects/${id}`)

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
