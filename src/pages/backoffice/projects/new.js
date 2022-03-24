/* eslint-disable camelcase */
import { useState, useEffect } from 'react'
import { Button, Form, Image, Loader } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import { API_URL } from 'utils/url'
import { uploadImage } from 'utils/uploadImage'
import { map } from 'lodash'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import { getSession } from 'next-auth/react'
import ImagesProjects from 'components/ImagesProjects'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const NewTask = () => {
  const [newProject, setNewProject] = useState({
    title: '',
    front_technologies: '',
    back_technologies: '',
    images: [{}],
    description: ''
  })
  const [reload, setReload] = useState(false)
  const [images, setImages] = useState([{}])
  const { query, push } = useRouter()
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loadImage, setLoadImage] = useState(null)
  const [fileImage, setFileImage] = useState(null)
  const [width, setWidth] = useState('60%')
  const [value, setValue] = useState('')
  const [_id, set_id] = useState('')

  const getProject = async () => {
    const res = await fetch(`${API_URL}/api/projects/` + query.id)
    const data = await res.json()
    set_id(data[0]._id)
    setNewProject({
      title: data[0].title,
      description: data[0].description,
      front_technologies: data[0].front_technologies,
      back_technologies: data[0].back_technologies,
      images: data[0].images
    })
    setImages(data[0].images)
    setValue(data[0].description)
  }
  useEffect(() => {
    if (query.id) getProject()
    if (window.screen.width > 1000) {
      setWidth('50%')
    } else {
      setWidth('80%')
    }
  }, [query, reload])
  const handleSubmit = async (e) => {
    e.preventDefault()
    const imageUrl = {
      secure_url: '',
      public_id: ''
    }
    if (loadImage) {
      const data = await uploadImage(fileImage)
      imageUrl.secure_url = data.data.secure_url
      imageUrl.public_id = data.data.public_id
      newProject.images.push(imageUrl)
    }

    const err = validate()
    Object.keys(err)
    if (Object.keys(err).length === 0) {
      setIsSubmitting(true)
      if (query.id) {
        await updateProject()
      } else {
        await createProject()
      }

      await push('/')
    }
  }

  const handleChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value })
  }
  const handleDescription = async (e) => {
    setValue(e)
    setNewProject({ ...newProject, description: e })
  }
  const validate = () => {
    const err = {}
    map(newProject, (element, index) => {
      if (element === '') {
        err[index] = `${index} is required`
      }
    })
    setErrors(err)
    return err
  }

  const createProject = async () => {
    try {
      await fetch(`${API_URL}/api/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProject)
      })
    } catch (error) {
      console.error(error)
    }
  }

  const updateProject = async () => {
    try {
      await fetch(`${API_URL}/api/projects/` + _id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProject)
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div
      className="form-container"
      style={{ textAlign: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <h1>{!query.id ? 'Create project' : 'Update project'}</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {isSubmitting
          ? (
          <Loader active inline="centered" />
            )
          : (
          <Form onSubmit={handleSubmit} style={{ width: width }}>
            {map(newProject, (element, index) =>
              index !== 'description' && index !== 'images'
                ? (
                <>
                  <Form.Input
                    key={index}
                    label={index}
                    placeholder={index}
                    name={index}
                    onChange={handleChange}
                    value={element}
                    autoFocus
                  />
                  {<p style={{ color: 'red' }}>{errors[index]}</p>}{' '}
                </>
                  )
                : (
                    index !== 'images' && (
                  <>
                    <p style={{ fontWeight: 'bold' }}>{index}</p>
                    <ReactQuill
                    value={value}
                      name={index}
                      onChange={(e) => handleDescription(e)}
                      modules={{
                        toolbar: {
                          container: [
                            [{ header: [1, 2, 3, 4, 5, 6, false] }],
                            ['bold', 'italic', 'underline'],
                            [{ list: 'ordered' }, { list: 'bullet' }],
                            [{ align: [] }],
                            ['link', 'image'],
                            ['clean'],
                            [{ color: [] }]
                          ]
                        }
                      }}
                      placeholder="Add a description of your event"
                      id="txtDescription"
                    />
                  </>
                    )
                  )
            )}
            {images !== undefined && query.id && (
              <ImagesProjects
                reload={reload}
                setReload={setReload}
                images={images}
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

export default NewTask
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
