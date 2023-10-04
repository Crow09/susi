'use client'
import { useEffect, useState, useRef } from "react"

export default function CommentList({parentId}){
  const comRef = useRef();
  const [comment, setComment] = useState("")
  const [commentList, setCommentList] = useState([])
  const getCommentList = () => {
    fetch('/api/comment/list',
      { method: "POST",
        body: JSON.stringify({ parentId: parentId })}
    )
    .then(res=>res.json())
    .then(result=>setCommentList(result))
  }

  const onClickHandler = () => {
    comRef.current.value="";
    fetch('/api/comment/new',
      {
        method: "POST",
        body: JSON.stringify({ comment: comment, parentId: parentId })
      }
    )
    .then(res=>res.json())
    .then(result=>getCommentList())
  }

  const deleteHandler = (id) => {
    console.log(id);
    fetch('/api/comment/delete',
      {
        method: "POST",
        body: JSON.stringify({ id: id, parentId: parentId })
      }
    )
    .then(res=>res.json())
    .then(result=>getCommentList())
  }

  const onChangeHandler = (e) => setComment(e.target.value);  
  useEffect(getCommentList, [])

  return (
    <>
      <input placeholder="댓글을 작성하세요!" ref={comRef} onChange={onChangeHandler} name="comment" type="text" required/>
      <button onClick={onClickHandler}>댓글 작성</button>
      { commentList.map((item, i)=><div key={i}>{item.comment}<button onClick={() => deleteHandler(item._id)}>삭제</button></div>)}
    </>
  )
}