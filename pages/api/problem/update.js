import client from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res){
  // console.log(req.body)
  let cpObj = {...req.body}
  delete cpObj._id;
  console.log(cpObj)
  const db = await client.db('bank_q');
  const result = await db.collection('problems').updateOne({_id:new ObjectId(req.body._id)},
  {$set: {...cpObj}}
  )
  res.redirect(302, `/detail/${req.body._id}`);
}