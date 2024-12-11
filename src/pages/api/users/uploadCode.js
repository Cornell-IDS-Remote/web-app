import clientPromise from "../../../../lib/mongodb.js";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, codeContent } = req.body;
    const client = await clientPromise;
    const db = client.db("robocity");

    await db.collection("userCodes").insertOne({
      username,
      codeContent,
      createdAt: new Date(),
    });

    res.status(201).json({ message: "Code uploaded" });
  } else {
    res.status(405).end();
  }
}
