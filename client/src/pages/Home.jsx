import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import { useDispatch } from 'react-redux'
import { adduser } from '../redux/features/userProfileSlice'

const Home = () => {

  const dispatch = useDispatch();
const authUser=async()=>{
  try{
    let response = await fetch('http://localhost:5000/api/getUserData',{
      method:'POST',
      headers:{
        authorization:'Bearer '+sessionStorage.getItem('token'),
        userid:sessionStorage.getItem('userId')
      }
    })
    let userData = await response.json();
    dispatch(adduser(userData.data))
  }
  catch(error){
    console.log("Error while posting getuserdata api", error)
  }
}

  useEffect(()=>{
    authUser();
  },[]);
  return (
    <>
    <Layout>
      <div>
          <h3>Home page </h3>
          <p>Code everyday to become a good software developer</p>
      </div>
    </Layout>
    </>
  )
};

export default Home;