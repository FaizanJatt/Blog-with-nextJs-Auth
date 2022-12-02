import mongoose, { Schema, model, models } from "mongoose";

const CommentsSchema = new Schema({
  comment: {
    type: String,
    min: 1,
    required: true,
  },
  name: {
    type: String,
    required: true,
    default: "Cato",
  },
  email: {
    type: String,
    required: true,
    default: "pikachu@gmail.com",
  },
  image: {
    type: String,
    required: true,
    default:
      "https://lh3.googleusercontent.com/a/ALm5wu1wIEMNm-Mmyp1oxVFqwNHsCwq3wD5uLm0yCR1zwQ=s360-p-rw-no",
  },
  Author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
    default: "6388df90561cb0dc644c9531",
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "posts",
  },
});

const Comments = models.comment || model("comment", CommentsSchema);

export default Comments;
