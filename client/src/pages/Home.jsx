import React, { useEffect } from 'react'
<<<<<<< HEAD
import Layout from '../components/Layout'
import { useDispatch } from 'react-redux'
import { adduser } from '../redux/features/userProfileSlice'

const Home = () => {

const dispatch = useDispatch()
=======
import axios from 'axios'

const Home = () => {

>>>>>>> f10f14433c85419b267b8c46e214f708c7e6723f
const authUser=async()=>{
  try{
    let response = await fetch('http://localhost:5000/api/getUserData',{
      method:'POST',
      headers:{
        authorization:'Bearer '+sessionStorage.getItem('token'),
        userid:'userId'
      }
    })
<<<<<<< HEAD
    let userData = await response.json()
    dispatch(adduser(userData.data.name))
  }
  catch(error){
    console.log("Error while posting getuserdata api", error)
=======
    console.log("response: ", response.json())
  }
  catch(error){
    console.log("Error while posting getuserdata api")
>>>>>>> f10f14433c85419b267b8c46e214f708c7e6723f
  }
}

  useEffect(()=>{
    authUser()
  },[])
  return (
    <>
<<<<<<< HEAD
    <Layout>
      <div>
          <h3>Home page </h3>
      </div>
    </Layout>
=======
    <div>
        <h3>Home page </h3>
        <button onClick={authUser}>post user</button>
    </div>
>>>>>>> f10f14433c85419b267b8c46e214f708c7e6723f
    </>
  )
}

export default Home;