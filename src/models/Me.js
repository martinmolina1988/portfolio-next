import { models, model, Schema } from "mongoose";

const meSchema = new Schema(
  {
    name: {
      type: "string",
      required: [true, "Title is required"],
      unique: true,
      trim: true,
      maxLength: [40, "Title must be less than 40 characters"],
    },
    phone: {
      type: "string",
      trim: true,
    },
    nationality: {
      type: "string",
      trim: true,
    },
    image: {
      public_id: "string",
      secure_url: "string",
    },
    email: {
      type: "string",
      trim: true,
    },
    github: {
      type: "string",
      trim: true,
    },
    linkedin: {
      type: "string",
      trim: true,
    },
    description: {
      type: "string",
      trim: true,
    },
    year: {
      type: "string",
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export default models.Me || model("Me", meSchema);
