import clientPromise from "../../../../lib/mongodb.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    const client = await clientPromise;
    const db = client.db("robocity");

    try {
      const user = await db.collection("users").findOne({ email });

      // Verify user exists and password is correct
      if (user && (await bcrypt.compare(password, user.password))) {
        // Generate JWT with admin field
        const token = jwt.sign(
          {
            userId: user._id,
            admin: user.admin, // Include admin field from the database
          },
          process.env.JWT_SECRET, // Ensure JWT_SECRET is set in .env.local
          { expiresIn: "1h" } // Token expires in 1 hour
        );

        // Set token in HTTP-only cookie
        res.setHeader(
          "Set-Cookie",
          `token=${token}; HttpOnly; Path=/; Max-Age=3600;`
        );

        res.status(200).json({ message: "Login successful" });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
}
