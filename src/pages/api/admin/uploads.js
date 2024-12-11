import jwt from "jsonwebtoken";
import clientPromise from "../../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res
      .status(405)
      .json({ message: `Method ${req.method} not allowed` });
  }

  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    // Verify the JWT and check admin status
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.admin) {
      return res
        .status(403)
        .json({ message: "Forbidden: Admin access required" });
    }

    const client = await clientPromise;
    const db = client.db("robocity");

    // Fetch all uploads
    const uploads = await db.collection("uploads").find().toArray();

    res.status(200).json(uploads);
  } catch (error) {
    console.error("Error fetching uploads:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
