import Me from 'models/Me'
import { dbConnect } from 'utils/mongoose'
dbConnect()

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const {
    method,
    query: { id },
    body
  } = req

  const nameEndpoint = 'Me'

  switch (method) {
    case 'GET':
      try {
        const data = await Me.findById(id)
        if (!data) {
          return res
            .status(404)
            .json({ msg: `${nameEndpoint} does not exists` })
        }
        return res.status(200).json(data)
      } catch (error) {
        return res.status(400).json({ msg: error.message })
      }
    case 'PUT':
      try {
        const data = await Me.findByIdAndUpdate(id, body, {
          new: true,
          runValidators: true
        })
        if (!data) {
          return res
            .status(404)
            .json({ msg: `${nameEndpoint} does not exists` })
        }
        return res.status(200).json(data)
      } catch (error) {
        return res.status(400).json({ msg: error.message })
      }
    case 'DELETE':
      try {
        const deletedData = await Me.findByIdAndDelete(id)
        if (!deletedData) {
          return res
            .status(404)
            .json({ msg: `${nameEndpoint} does not exists` })
        }
        return res.status(204).json()
      } catch (error) {
        return res.status(400).json({ msg: error.message })
      }
    default:
      return res.status(400).json({ msg: 'This method is not supported' })
  }
}
