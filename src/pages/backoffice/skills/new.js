import { useState, useEffect } from 'react'
import { Button, Form, Image, Loader } from 'semantic-ui-react'

import { useRouter } from 'next/router'
import { API_URL } from 'utils/url'
import { map } from 'lodash'
import { uploadImage } from 'utils/uploadImage'
import { deleteCloudImage } from 'utils/cloudinary'
import { getSession } from 'next-auth/react'

const NewSkill = () => {
  const [newData, setNewData] = useState({
    name: '',
    image: {
      secure_url: '',
      public_id: ''
    },
    description: '',
    value: 0
  })
  const nameEndpoint = 'skills'
  const { query, push } = useRouter()
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loadImage, setLoadImage] = useState(null)
  const [fileImage, setFileImage] = useState(null)
  const [width, setWidth] = useState('60%')

  const getData = async () => {
    const res = await fetch(`${API_URL}/api/${nameEndpoint}/` + query.id)
    const data = await res.json()
    setNewData({
      name: data.name,
      image: data.image,
      description: data.description,
      value: data.value,
      oldImage: data.image.public_id
    })
  }

  useEffect(() => {
    if (query.id) getData()
    if (window.screen.width > 1000) {
      setWidth('50%')
    } else {
      setWidth('80%')
    }
  }, [query])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (loadImage) {
      const data = await uploadImage(fileImage)
      newData.image.secure_url = data.data.secure_url
      newData.image.public_id = data.data.public_id
    }

    const err = validate()
    Object.keys(err)
    if (Object.keys(err).length === 0) {
      setIsSubmitting(true)
      if (query.id) {
        await updateForm()
      } else {
        await createForm()
      }

      await push('/')
    }
  }

  const handleChange = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value })
  }

  const validate = () => {
    const err = {}
    map(newData, (element, index) => {
      if (element === '') {
        err[index] = `${index} is required`
      }
    })
    setErrors(err)
    return err
  }

  const createForm = async () => {
    try {
      await fetch(`${API_URL}/api/${nameEndpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      })
    } catch (error) {
      console.error(error)
    }
  }
  const updateForm = async () => {
    if (Object.values(newData.image).length > 0) {
      deleteCloudImage(newData.oldImage)
    }

    try {
      await fetch(`${API_URL}/api/${nameEndpoint}/` + query.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="form-container" style={{ textAlign: 'center' }}>
      <h1>{!query.id ? `Create ${nameEndpoint}` : `Update ${nameEndpoint}`}</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {isSubmitting
          ? (
          <Loader active inline="centered" />
            )
          : (
          <Form onSubmit={handleSubmit} style={{ width: width }}>
            {map(newData, (element, index, i) =>
              index !== 'description' && index !== 'image'
                ? (
                <>
                  <Form.Input
                    key={i}
                    label={index}
                    placeholder={index}
                    name={index}
                    onChange={handleChange}
                    value={element}
                    autoFocus
                  />
                  {
                    <p key={i} style={{ color: 'red' }}>
                      {errors[index]}
                    </p>
                  }{' '}
                </>
                  )
                : (
                    index !== 'image' && (
                  <Form.TextArea
                    key={index}
                    label="Description"
                    placeholder="Description"
                    name="description"
                    onChange={handleChange}
                    value={element}
                  />
                    )
                  )
            )}
            {Object.values(newData.image).length > 0 && (
              <Image
                key={newData.image._id}
                src={newData.image.secure_url}
                alt={newData.image._id}
              />
            )}
            <Form.Input
              border-radius="5px"
              padding="4px 5px"
              cursor="pointer"
              type="file"
              onChange={(event) => {
                const file = event.currentTarget.files[0]
                setFileImage(file)
                setLoadImage(URL.createObjectURL(file))
              }}
            />
            {loadImage && <Image src={loadImage} alt="image" />}
            <Button type="submit" primary>
              {query.id ? 'Update' : 'Save'}
            </Button>
          </Form>
            )}
      </div>
    </div>
  )
}

export default NewSkill
export async function getServerSideProps (context) {
  const session = await getSession(context)
  if (session?.user.name !== process.env.NEXT_PUBLIC_NAME_ID) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  return {
    props: {
      session
    }
  }
}
