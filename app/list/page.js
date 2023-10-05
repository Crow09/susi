import client from "@/util/database"
import Link from "next/link";
import DelBtn from "./delBtn";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function Board(){
  const db = await client.db('bank_q');
  const list = await db.collection('problems').find().toArray();
  const session = await getServerSession(authOptions);
  
  return(
    <div className="list">
      <h3>Problems</h3>
      {
        list.map((item, i) => 
        <div key={i} className="list-item">
          <Link href={`/detail/${item._id.toString()}`} style={{marginRight:"5px"}}>
            {item.name}
          </Link>
          {item.views} views
          { item.author?.email === session?.user.email ||
            session?.user.email === process.env.ADMIN
            ? <DelBtn id={item._id.toString()}/> : ""}
        </div>)
      }
    </div>
  ) 
}