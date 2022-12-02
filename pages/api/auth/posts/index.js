import Post from "../../../../models/Posts";
import dbConnect from "../../../../utils/dbConnect";

dbConnect();

export default async (req, res) => {
  const { method } = req;
  if (method === "GET") {
    try {
      const posts = await Post.find({});
      res.status(200).json({ data: posts });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  } else if (method === "POST") {
    try {
      console.log(req.body);

      const post = await Post.create(req.body);
      res.status(200).json({ data: post });
      console.log(post);
    } catch (error) {
      res.status(400).json({ message: "failed" });
    }
  } else {
    res.status(400).json({ message: "Access Denied" });
  }
};
