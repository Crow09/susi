'use client'
import { useState } from "react";

export default function New() {
  const [image, setImage] = useState('');
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");
  const [inputType, setInputType] = useState("checkbox");

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
  
  const deleteHandler = (i) => {
    setItems(items.filter((item, index)=>index!=i))
  }

  const changeHandler = (e) => {
    setInputType(e.target.value);
    console.log(e.target.value);
  }
  
  return (
    <div className="new">
      <form action="/api/problem/new" method="POST">
        <div className="new">
          <h2>문제 등록</h2>
          <input name="name" type="text" style={{height:"30px", width:"320px", marginBottom:"10px"}} required/>
          <div><label>사진: </label><input type="file" onChange={imageLoadHandler}></input></div>
          <div style={{width:'600px'}}><img style={{width:"200px"}} src={image}/></div>
          <textarea name="question" onChange={autoSizeTextArea} required/>
          <div style={{borderBottom:"solid 0.5px", marginBottom:"10px", width:"530px"}}>
          <center><h2>보기</h2></center>
          {
            items.map((item, i) => {
              return (
                <div key={i}>
                  <input type="hidden" name="exam" value={item}/>
                  <input type={inputType} name="correct" value={item}/> {item}
                  <button style={{margin:"3px"}} type="button" onClick={() => deleteHandler(i)}>보기 삭제</button>
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
            <input type="radio" name="type" value="checkbox" onChange={changeHandler} defaultChecked required/>복수 정답
            <input type="radio" name="type" value="radio" onChange={changeHandler} required/>단일 정답
          </div>
          <input type="hidden" name="img" value={image}/>
          <input type="hidden" name="views" value={0} />
        </div>
        {
          items.length >= 2 ? <button type="submit" style={{marginTop:"5px"}}>등록</button> : ""
        }
      </form>
    </div>
  )
}