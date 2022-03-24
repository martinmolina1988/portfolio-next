/* eslint-disable camelcase */
import { map } from 'lodash'
import React from 'react'
import { Button, Image } from 'semantic-ui-react'
import { deleteCloudImage } from 'utils/cloudinary'
import { API_URL } from 'utils/url'

function Tables ({ element, reload, setReload }) {
  const nameEndpoint = 'delete_images'
  const deleteImage = async (public_id) => {
    try {
      await deleteCloudImage(public_id)
      await fetch(`${API_URL}/api/${nameEndpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ public_id })
      })
      setReload(!reload)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <tr>
      <td>
        <Image src={element.secure_url} alt={element} />
      </td>
      <td>
        <Button color={'red'} onClick={() => deleteImage(element.public_id)}>
          Eliminar
        </Button>
      </td>
    </tr>
  )
}

export default function ImagesProjects ({ images, reload, setReload }) {
  return (
    <div style={{ width: '100%' }}>
      <table
        style={{
          backgroundColor: 'rgba(0,0,0,0.5)',
          margin: 'auto',
          padding: '30px'
        }}
      >
        <tr>
          <th>imagen</th>
          <th>Eliminar</th>
        </tr>

        {map(images, (element, index) => (
          <Tables
            element={element}
            key={index}
            reload={reload}
            setReload={setReload}
          />
        ))}
      </table>
    </div>
  )
}
