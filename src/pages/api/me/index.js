import Me from "models/Me";
import { dbConnect } from "utils/mongoose";
dbConnect();
export default async function handler(req, res) {
  const { method, body } = req;
  switch (method) {
    case "GET":
      try {
        const data = await Me.find();
        return res.status(200).json(data);
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }
    case "POST":
      try {
        const newData = new Me(body);
        const savedData = await newData.save();
        return res.status(201).json(savedData);
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }
    default:
      return res.status(400).json({ msg: "This method is not supported" });
  }
}
