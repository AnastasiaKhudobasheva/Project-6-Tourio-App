// import { places } from "../../../lib/db";

// export default function handler(request, response) {
//   response.status(200).json(places);
//   return;
// }
import dbConnect from "@/db/connect";
import Place from "@/db/models/Place";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const places = await Place.find({});
      return res.status(200).json(places);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch places." });
    }
  }

  if (req.method === "POST") {
    try {
      const newPlace = new Place(req.body);
      await newPlace.save();
      return res.status(201).json(newPlace);
    } catch (error) {
      return res.status(400).json({ error: "Failed to create place." });
    }
  }

  res.status(405).json({ error: "Method not allowed" });
}
