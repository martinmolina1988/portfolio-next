import { useTasks } from 'context/TasksContext'
import { map } from 'lodash'
import Link from 'next/link'
import isAdmin from 'pages/api/isAdmin'
import React, { useState, useEffect } from 'react'
import { Button, Image } from 'semantic-ui-react'
import { API_URL } from 'utils/url'

export default function SidebarContent () {
  const { setVisible } = useTasks()
  const [data, setData] = useState({})
  const loadData = async () => {
    const res = await fetch(`${API_URL}/api/sidebar`)
    const data = await res.json()
    setData(data)
  }

  const [admin, setAdmin] = useState(false)
  const loadIsAdmin = () => {
    isAdmin().then((response) => setAdmin(response))
  }

  useEffect(() => {
    loadIsAdmin()
    loadData()
  }, [])

  return (
    <div style={{ textAlign: 'center', color: 'white' }}>
      <Image
        circular
        src={data?.me}
        alt=""
        size="medium"
        style={{ margin: '40px auto' }}
      />
      {admin && (
        <Link href="/backoffice">
          <Button color={'blue'}>
            <a onClick={() => setVisible(false)}> BackOffice</a>
          </Button>
        </Link>
      )}{' '}
      <h3> Datos personales</h3>
      <ul style={{ listStyle: 'none' }}>
        <li>
          {' '}
          <Link className="link" href="/">
            <h4>
              <a onClick={() => setVisible(false)}> Sobre mi</a>
            </h4>
          </Link>
        </li>
        <li>
          <Link className="link" href="/skills">
            <h4>
              {' '}
              <a onClick={() => setVisible(false)}>Mis habilidades</a>{' '}
            </h4>
          </Link>
        </li>
      </ul>
      <h3>Experiencia laboral</h3>
      <ul style={{ listStyle: 'none' }}>
        {map(data.experiences, (experience, index) => (
          <li>
            <Link className="link" href={`/experience/${experience._id}`}>
              <h4>
                <a onClick={() => setVisible(false)}> {experience.title}</a>
              </h4>
            </Link>
          </li>
        ))}
      </ul>
      <h3> Mis proyectos</h3>
      <ul style={{ listStyle: 'none' }}>
        {map(data.projects, (project, index) => (
          <li>
            <Link className="link" href={`/projects/${project.title}`}>
              <h4>
                <a onClick={() => setVisible(false)}> {project.title}</a>
              </h4>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
