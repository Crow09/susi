import client from "@/util/database";
import { ObjectId } from "mongodb";

export default async function check(req, res) {
  const db = await client.db('bank_q');
  const result = await db.collection('problems').findOne({_id : new ObjectId(req.body)});
  console.log(typeof(result.correct))
  console.log(typeof(req.body.exam))
  if(typeof(req.body.exam) !== typeof(result.correct))
    return res.redirect(302, "/msg/wrong");
  if (typeof(req.body.exam) === "string")
    if (result.correct === req.body.exam)
      return res.redirect(302, "/msg/correct");
    else
      return res.redirect(302, "/msg/wrong");
  else {
    req.body.exam.map((item, i) => {
      if (result.correct[i] !== item) return res.redirect(302, "/msg/wrong");
    })
    return res.redirect(302, "/msg/correct");
  }
}