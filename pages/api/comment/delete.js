import client from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const id = JSON.parse(req.body).id;
  console.log(id);
  const db = await client.db("bank_q");
  const result = await db.collection('comments').deleteOne({_id: new ObjectId(id)})
  return res.status(200).json(result)
}