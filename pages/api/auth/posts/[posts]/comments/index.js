import Comment from "../../../../../../models/Comments";
import dbConnect from "../../../../../../utils/dbConnect";

dbConnect();

export default async (req, res) => {
  const { method, query } = req;
  console.log(query);
  if (method === "GET") {
    try {
      const comments = await Comment.find({ query });
      res.status(200).json({ data: comments });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  } else if (method === "POST") {
    try {
      console.log(req.body);
      const comment = await Comment.create(req.body);
      console.log(comment);
      res.status(200).json({ data: comment });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "failed" });
    }
  } else {
    res.status(400).json({ message: "Access Denied" });
  }
};
