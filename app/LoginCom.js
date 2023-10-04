'use client'
import { signIn, signOut } from "next-auth/react"

function LoginCom(){
  return(
    <button onClick={()=>{signIn()}}>로그인</button>
  )
}

function LogoutCom(){
  return(
    <button onClick={()=>{signOut()}}>로그아웃</button>
  )
}

export { LoginCom, LogoutCom }