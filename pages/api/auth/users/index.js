import Users from "../../../../models/Schema";
import dbConnect from "../../../../utils/dbConnect";

dbConnect();

export default async (req, res) => {
  const { method } = req;
  if (method === "GET") {
    try {
      const users = await Users.find({});
      res.status(200).json({ data: users });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }
};
