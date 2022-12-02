import Users from "../../../../models/Schema";
import dbConnect from "../../../../utils/dbConnect";

dbConnect();

export default async (req, res) => {
  const { method, query } = req;
  console.log(query.usersId);
  const id = query.usersId;
  if (method === "GET") {
    try {
      const user = await Users.find({ _id: id });
      res.status(200).json({ data: user });
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }
};
