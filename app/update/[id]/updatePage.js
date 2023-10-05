'use client'
import { useState } from "react";

export default function UpdatePage({data}) {
  const [image, setImage] = useState(data.img);
  const [items, setItems] = useState(data.exam);
  const [text, setText] = useState('');
  const [inputType, setInputType] = useState(data.type);
  console.log("불러와짐")

  const examCreator = (e) => {
    if (text) {
      e.preventDefault();
      setItems([...items, text]);
      setText("");
    }
  }
  
  const imageLoadHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader(file);
    reader.readAsDataURL(file);
    reader.onload = () => setImage(reader.result);
  }

  const autoSizeTextArea = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  const deleteHandler = (e) => {
    e.target.parentNode.remove();
  }

  const changeHandler = (e) => {
    setInputType(e.target.value);
    console.log(e.target.value);
  }

  return (
    <div className="new">
      <form action="/api/problem/update" method="POST">
        <div className="new">
          <h2>문제</h2>
          <input name="name" defaultValue={data.name} type="text" style={{height:"30px", width:"320px", marginBottom:"10px"}} required/>
          <div><label>사진: </label><input type="file" onChange={imageLoadHandler}></input></div>
          <div style={{width:'600px'}}><img style={{width:"200px"}} src={image}/></div>
          <textarea name="question" onChange={autoSizeTextArea} defaultValue={data.question} style={{fontSize:"20px", fontFamily:"sans-serif", width:"530px"}} required/>
          <div style={{border:"solid 0.5px", marginBottom:"4px"}}>
          <h2>보기</h2>
          {
            items.map((item, i) => {
              return (
                <div key={i}>
                  <input type="hidden" name="exam" value={item}/>
                  {
                    data.correct.includes(item) ?
                    <><input type={inputType} name="correct" value={item} defaultChecked/> {item} </>:
                    <><input type={inputType} name="correct" value={item}/> {item} </>
                  }
                  <button type="button" onClick={deleteHandler}>보기 삭제</button>
                </div>
              )}
            )
          }
          </div>
          <input  style={{width:'530px', height:'50px'}}
                  type="text"
                  value={text} // 입력 상태 반영
                  onChange={(e)=>{
                    setText(e.target.value);
                  }}
          />
          <div style={{marginTop:"4px"}}><button type='button' onClick={examCreator}>보기 추가</button></div>
          <div>
            <input type="radio" name="type" value="checkbox" onChange={changeHandler} required/>복수 정답
            <input type="radio" name="type" value="radio" onChange={changeHandler} required/>단일 정답
          </div>
          <input type="hidden" name="img" value={image}/>
          <input type="hidden" name="_id" value={data._id.toString()} />
          <input type="hidden" name="views" value={data.views} />
        </div>
        {
          items.length >= 2 ? <button type="submit">수정</button> : ""
        }
      </form>
    </div>
  )
}
