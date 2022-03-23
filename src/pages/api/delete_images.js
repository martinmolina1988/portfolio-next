import Project from "models/Project";
export default async function handler(req, res) {
  const { body } = req;

  try {
    const project = await Project.updateOne(
      { "images.public_id": body.public_id },
      {
        $pull: { images: body },
      }
    );
    if (!project)
      return res.status(404).json({ msg: "project does not exists" });
    return res.status(200).json(project);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
}
