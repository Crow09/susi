import client from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res){
  // console.log(req.body)
  const session = await getServerSession(req, res, authOptions);
  let cpObj = {...req.body}
  delete cpObj._id;
  console.log(cpObj)
  const db = await client.db('bank_q');
  if (!req.body.correct || session === null)
    return res.redirect(302, `/update/${req.body._id}`);
  const result = await db.collection('problems').updateOne({_id:new ObjectId(req.body._id)},
    {$set: {...cpObj}}
  )
  res.redirect(302, `/detail/${req.body._id}`);
}