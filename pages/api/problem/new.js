import client from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res){
  if (req.body.correct) {
    const session = await getServerSession(req, res, authOptions);
    req.body.author = session.user;
    const db = await client.db('bank_q');
    const result = await db.collection('problems').insertOne(req.body);
    res.redirect(302, "/list");
  }
  else return res.redirect(302, "/new");
}