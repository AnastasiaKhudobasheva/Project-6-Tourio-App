import dbConnect from "@/db/connect";
import Comment from "@/db/models/Comment";

export default async function handler(req, res) {
  await dbConnect();

  const { id: placeId } = req.query;

  if (req.method === "GET") {
    try {
      const comments = await Comment.find({ placeId }).sort({ createdAt: -1 });
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: "Error fetching comments", error });
    }
  } else if (req.method === "POST") {
    try {
      const { name, comment } = req.body;
      const newComment = await Comment.create({ name, comment, placeId });
      res.status(201).json(newComment);
    } catch (error) {
      res.status(400).json({ message: "Error creating comment", error });
    }
  } else if (req.method === "DELETE") {
    try {
      const { commentId } = req.body;
      await Comment.findByIdAndDelete(commentId);
      res.status(200).json({ message: "Comment deleted" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting comment", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
