import { Carousel } from 'react-carousel-minimal'
import { useEffect, useState } from 'react'
// import { map } from 'lodash'
import { Dimmer, Loader } from 'semantic-ui-react'
import style from './Carousel.module.css'
function Carousels ({ images }) {
  const [mount, setMount] = useState(false)
  const [data, setData] = useState([{}])
  const loadData = async () => {
    const res = await images.map((image, index) => {
      if (image.secure_url !== undefined) {
        const obj = {
          image: image.secure_url,
          caption: index + 1
        }
        return obj
      }
      return {}
    }
    )

    setData(res)

    setMount(true)
  }
  useEffect(() => {
    loadData()
  }, [images])
  const captionStyle = {
    fontSize: '2em',
    fontWeight: 'bold'
  }
  const slideNumberStyle = {
    fontSize: '20px',
    fontWeight: 'bold'
  }
  if (Object.keys(data[0]).length === 0) { data.shift() }
  return (
    <div style={{ margin: '40px 0' }}>
      <div style={{ textAlign: 'center' }}>
        <h2>Algunas imagenes del proyecto</h2>
        {
        !mount
          ? (
          <Dimmer active>
            <Loader />
          </Dimmer>
            )
          : (
          <div
            style={{
              padding: '0 20px'
            }}
          >
            <Carousel
              data={data}
              time={2000}
              width="850px"
              height="500px"
              captionStyle={captionStyle}
              radius="10px"
              slideNumber={true}
              slideNumberStyle={slideNumberStyle}
              captionPosition="bottom"
              automatic={true}
              dots={true}
              pauseIconColor="white"
              pauseIconSize="40px"
              slideBackgroundColor="transparent"
              slideImageFit="contain"
              thumbnails={true}
              thumbnailWidth="100px"
              className={style.carousel}
            />
          </div>
            )}
      </div>
    </div>
  )
}

export default Carousels
