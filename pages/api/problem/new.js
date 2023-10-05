import client from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res){
  const session = await getServerSession(req, res, authOptions);
  console.log(session);
  if (!req.body.correct || session === null)
      return res.redirect(302, "/new");
  else {
    req.body.author = session.user;
    const db = await client.db('bank_q');
    const result = await db.collection('problems').insertOne(req.body);
    res.redirect(302, "/list");
  }
}