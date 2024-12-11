// src/pages/api/auth/status.js
import jwt from "jsonwebtoken";

export default function handler(req, res) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ loggedIn: false, isAdmin: false });

  try {
    // Verify and decode the JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Extract admin status from the decoded token
    const isAdmin = decoded.admin || false;

    return res.status(200).json({ loggedIn: true, isAdmin });
  } catch (error) {
    return res.status(401).json({ loggedIn: false, isAdmin: false });
  }
}
