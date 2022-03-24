import Experience from 'models/Experience'
import Project from 'models/Project'
import Me from 'models/Me'
import Skill from 'models/Skill'
export default async function handler (req, res) {
  try {
    const experiences = await Experience.find().select('title')
    const projects = await Project.find().select('title -_id')
    const me = await Me.findOne().select('name')
    const skills = await Skill.find().select('name')
    const data = {
      experiences,
      projects,
      me,
      skills
    }
    return res.status(200).json(data)
  } catch (error) {
    return res.status(400).json({ msg: error.message })
  }
}
