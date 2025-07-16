import dbConnect from "@/db/connect";
import Comment from "@/db/models/Comment";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const { name, comment, placeId } = req.body;

      if (!name || !comment || !placeId) {
        return res.status(400).json({ message: "Missing fields" });
      }

      const newComment = await Comment.create({ name, comment, placeId });

      res.status(201).json(newComment);
    } catch (error) {
      res.status(500).json({ message: "Error saving comment", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
