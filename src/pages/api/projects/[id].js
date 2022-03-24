import Project from 'models/Project'
import { dbConnect } from 'utils/mongoose'
dbConnect()

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const {
    method,
    query: { id },
    body
  } = req
  switch (method) {
    case 'GET':
      try {
        const project = await Project.find({ title: id })
        if (!project) { return res.status(404).json({ msg: 'project does not exists' }) }
        return res.status(200).json(project)
      } catch (error) {
        return res.status(400).json({ msg: error.message })
      }
    case 'PUT':
      try {
        const project = await Project.findByIdAndUpdate(id, body, {
          new: true,
          runValidators: true
        })
        if (!project) { return res.status(404).json({ msg: 'project does not exists' }) }
        return res.status(200).json(project)
      } catch (error) {
        return res.status(400).json({ msg: error.message })
      }
    case 'DELETE':
      try {
        const deletedproject = await Project.findByIdAndDelete(id)
        if (!deletedproject) { return res.status(404).json({ msg: 'project does not exists' }) }
        return res.status(204).json()
      } catch (error) {
        return res.status(400).json({ msg: error.message })
      }
    default:
      return res.status(400).json({ msg: 'This method is not supported' })
  }
}
