// import { places } from "../../../../lib/db.js";

// export default function handler(request, response) {
//   const { id } = request.query;

//   const place = places.find((place) => place.id === id);

//   if (!place) {
//     response.status(404).json({ status: "Not found" });
//     return;
//   }

//   response.status(200).json(place);
// }

import dbConnect from "@/db/connect";
import Place from "@/db/models/Place";

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const place = await Place.findById(id);
      if (!place) return res.status(404).json({ error: "Place not found." });
      return res.status(200).json(place);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch place." });
    }
  }

  if (req.method === "PUT") {
    try {
      const updatedPlace = await Place.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updatedPlace)
        return res.status(404).json({ error: "Place not found." });
      return res.status(200).json(updatedPlace);
    } catch (error) {
      return res.status(400).json({ error: "Failed to update place." });
    }
  }

  if (req.method === "DELETE") {
    try {
      const deletedPlace = await Place.findByIdAndDelete(id);
      if (!deletedPlace)
        return res.status(404).json({ error: "Place not found." });
      return res.status(200).json({ message: "Place deleted." });
    } catch (error) {
      return res.status(500).json({ error: "Failed to delete place." });
    }
  }

  res.status(405).json({ error: "Method not allowed." });
}
