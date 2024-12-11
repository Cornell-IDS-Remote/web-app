import jwt from "jsonwebtoken";
import multer from "multer";
import clientPromise from "../../../../lib/mongodb";

const upload = multer({ storage: multer.memoryStorage() });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ message: `Method ${req.method} not allowed` });
  }

  upload.fields([{ name: "carsFile" }, { name: "experimentFile" }])(
    req,
    res,
    async (err) => {
      if (err) {
        console.error("Multer error:", err);
        return res.status(500).json({ message: "File upload error" });
      }

      try {
        // Read token from cookie
        const token = req.cookies.token;
        if (!token) {
          return res
            .status(401)
            .json({ message: "Unauthorized: No token provided" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded JWT:", decoded); // Debugging

        const userId = decoded.userId;

        // Validate uploaded files
        const carsFile = req.files.carsFile?.[0];
        const experimentFile = req.files.experimentFile?.[0];

        if (!carsFile || !experimentFile) {
          return res.status(400).json({ message: "Both files are required" });
        }

        // Save files to the database
        const client = await clientPromise;
        const db = client.db("robocity");

        await db.collection("uploads").insertOne({
          userId,
          carsFile: {
            name: carsFile.originalname,
            data: carsFile.buffer.toString("utf-8"),
          },
          experimentFile: {
            name: experimentFile.originalname,
            data: experimentFile.buffer.toString("utf-8"),
          },
          uploadedAt: new Date(),
          executed: false,
        });

        return res.status(200).json({ message: "Files uploaded successfully" });
      } catch (error) {
        console.error("JWT Error:", error);
        if (error.name === "JsonWebTokenError") {
          return res
            .status(401)
            .json({ message: "Unauthorized: Invalid token" });
        }
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  );
}
