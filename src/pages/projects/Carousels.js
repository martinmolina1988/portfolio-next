import { Carousel } from 'react-carousel-minimal'
import { useEffect } from 'react'
import { map } from 'lodash'
import { Dimmer, Loader } from 'semantic-ui-react'
import style from './Carousel.module.css'
function Carousels ({ images }) {
  const data = [{}]
  const loadData = async () => {
    await map(images, (image, index) =>
      data.push({
        image: image.secure_url,
        caption: index + 1
      })
    )
    data.shift()
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
  return (
    <div style={{ margin: '40px 0' }}>
      <div style={{ textAlign: 'center' }}>
        <h2>Algunas imagenes del proyecto</h2>
        {Object.keys(data).length === 0
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
