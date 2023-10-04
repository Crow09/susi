import client from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res){
  const session = await getServerSession(req, res, authOptions)
  const data = JSON.parse(req.body)
  data.author = session.user
  console.log(data);
  const db = await client.db('bank_q');
  const result = await db.collection('comments').insertOne(data)
  return res.status(200).json(result)
}