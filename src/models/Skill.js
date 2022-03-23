import { models, model, Schema } from "mongoose";

const skillSchema = new Schema(
  {
    name: {
      type: "string",
      required: [true, "Title is required"],
      unique: true,
      trim: true,
      maxLength: [40, "Title must be less than 40 characters"],
    },
    image: {
      public_id: "string",
      secure_url: "string",
    },
    description: {
      type: "string",
      required: [true, "Description is required"],
      trim: true,
    },
    value: {
      type: "number",
      required: [true, "Description is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export default models.Skill || model("Skill", skillSchema);
