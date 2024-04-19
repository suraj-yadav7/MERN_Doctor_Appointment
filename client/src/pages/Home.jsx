import React, { useEffect } from 'react'
import axios from 'axios'

const Home = () => {

const authUser=async()=>{
  try{
    let response = await fetch('http://localhost:5000/api/getUserData',{
      method:'POST',
      headers:{
        authorization:'Bearer '+sessionStorage.getItem('token'),
        userid:'userId'
      }
    })
    console.log("response: ", response.json())
  }
  catch(error){
    console.log("Error while posting getuserdata api")
  }
}

  useEffect(()=>{
    authUser()
  },[])
  return (
    <>
    <div>
        <h3>Home page </h3>
        <button onClick={authUser}>post user</button>
    </div>
    </>
  )
}

export default Home;