'use client'

export default function DelBtn({id}){
  return(
    <span 
      style={{cursor:"pointer"}} 
      onClick={(e) => {
        fetch('/api/problem/delete',
        {
          method: "POST",
          body: JSON.stringify({id:id})
        })
        .then(res=>res.json())
        .then(()=>{
          e.target.parentNode.style.display="none";
        })
      }}>
      ❌
    </span>
  )
}