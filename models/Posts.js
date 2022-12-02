import mongoose, { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
  title: {
    type: String,
    min: 2,
    required: true,
  },
  message: {
    type: String,
    min: 1,
    required: true,
  },
  name: {
    type: String,
    required: true,
    default: "ok",
  },
  email: {
    type: String,
    required: true,
    default: "ok",
  },
  image: {
    type: String,
    required: true,
    default:
      "https://www.pokemoncenter.com/products/images/P7730/701-29235/P7730_701-29235_01_full.jpg",
  },
  uploadedImage: {
    type: String,
    required: true,
  },
  Author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
});

const Posts = models.post || model("post", PostSchema);

export default Posts;
