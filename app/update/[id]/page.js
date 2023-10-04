import client from "@/util/database";
import UpdatePage from "./updatePage";
import { ObjectId } from "mongodb";

export default async function Update({params}) {
  const db = await client.db("bank_q");
  const result = await db.collection("problems").findOne({_id : new ObjectId(params.id)});
  console.log(result);
  return (
    <div>
      <UpdatePage data={result} />
    </div>
  )
}