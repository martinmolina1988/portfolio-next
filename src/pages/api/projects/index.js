import Project from 'models/Project'
import { dbConnect } from 'utils/mongoose'
dbConnect()

export default async function handler (req, res) {
  const { method, body } = req
  switch (method) {
    case 'GET':
      try {
        const projects = await Project.find()
        return res.status(200).json(projects)
      } catch (error) {
        return res.status(400).json({ msg: error.message })
      }
    case 'POST':
      try {
        const newProject = new Project(body)
        const savedProject = await newProject.save()
        return res.status(201).json(savedProject)
      } catch (error) {
        return res.status(400).json({ msg: error.message })
      }
    default:
      return res.status(400).json({ msg: 'This method is not supported' })
  }
}
