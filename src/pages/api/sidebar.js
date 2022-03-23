import Experience from "models/Experience";
import Project from "models/Project";
import Me from "models/Me";
export default async function handler(req, res) {
  try {
    const experience = await Experience.find().select("title");
    const project = await Project.find().select("title -_id");
    const me = await Me.findOne().select("image -_id");
    const data = {
      experiences: experience,
      projects: project,
      me: me.image.secure_url,
    };
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
}
