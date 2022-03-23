import { models, model, Schema } from "mongoose";

const experienceSchema = new Schema(
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
    year: {
      type: "string",
      required: [true, "Description is required"],
      trim: true,
      maxLength: [200, "Description must be less than 200 characters"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export default models.Experience || model("Experience", experienceSchema);
