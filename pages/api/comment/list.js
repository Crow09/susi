import client from "@/util/database";

export default async function handler(req, res){
  const parentId = JSON.parse(req.body).parentId
  const db = await client.db('bank_q');
  const result = await db.collection('comments').find({parentId: parentId}).toArray();
  console.log(result);
  return res.status(200).json(result)
}