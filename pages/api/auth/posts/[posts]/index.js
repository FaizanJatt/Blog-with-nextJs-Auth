import Post from "../../../../../models/Posts";
import dbConnect from "../../../../../utils/dbConnect";

dbConnect();

export default async (req, res) => {
  const { method, query } = req;
  console.log(query.posts);
  const id = query.posts;
  if (method === "GET") {
    try {
      const posts = await Post.find({ _id: id });
      res.status(200).json({ data: posts });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }
};
