import { models, model, Schema } from "mongoose";

const projectSchema = new Schema(
  {
    title: {
      type: "string",
      required: [true, "Title is required"],
      unique: true,
      trim: true,
      maxLength: [40, "Title must be less than 40 characters"],
    },
    description: {
      type: "string",
      required: [true, "Description is required"],
      trim: true,
    },
    front_technologies: {
      type: "string",
      required: [true, "Description is required"],
      trim: true,
    },
    back_technologies: {
      type: "string",
      required: [true, "Description is required"],
      trim: true,
    },
    images: [
      {
        public_id: "string",
        secure_url: "string",
      },
    ],
    video: {
      type: "string",
      trim: true,
    },
    back_github: {
      type: "string",
      trim: true,
    },
    front_github: {
      type: "string",
      trim: true,
    },
    url_project: {
      type: "string",
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export default models.Project || model("Project", projectSchema);
