import { authOptions } from "@/pages/api/auth/[...nextauth]";
import client from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import Link from "next/link";
import CommentList from "./commentList";

export default async function Detail({params}){
  const db = await client.db('bank_q');
  const problem = await db.collection('problems').findOne({_id: new ObjectId(params.id)})
  let cpPr = {...problem};
  delete cpPr.views;
  console.log(typeof problem.views);
  const views = await db.collection("problems").updateOne({_id: new ObjectId(params.id)}, {$set: {...cpPr, "views": parseInt(problem.views)+1}})
  const session = await getServerSession(authOptions);
  console.log(problem.exam);
  return(
    <div className="detail">
      <center><h1 style={{border:"1px solid", margin:"5px", padding:"10px"}}>제목 : {problem.name} </h1></center>
      {
        session && (problem.author?.email === session?.user.email)
        ?
        <span>
          <Link href={`/update/${params.id}`}><button> 수정 </button></Link>
          <Link href={`/api/problem/delete/?id=${params.id}`}><button> 삭제 </button></Link>
        </span>
        : ""
      }
      <div>작성자 : {problem.author?.name}</div>
      <div>Views : {parseInt(problem.views)+1}</div>
      <div><img style={{width:"200px"}} src={problem.img ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZlDwPM7Mag_dUXHUmW1TzLHZ8wXZTFOlqm2aRsuLYRw&s"}/></div>
      <h2 style={{margin:"0"}}>문제 : <textarea value={problem.question} readOnly/></h2>
      <h2>보기</h2>
      <form action="/api/problem/check" method="POST">
        {
          problem.exam.map((item, i) => {
            return (
              <div key={i}>
                <input type={problem.type} name="exam" value={item}/> {item}
              </div>
            )
          })
        }
        <input type="hidden" value={params.id} name="id"/>
        <button type="submit">정답 제출</button>
      </form>
      {
        session ? <CommentList parentId={params.id}/> : ""
      }
    </div>
  )
}