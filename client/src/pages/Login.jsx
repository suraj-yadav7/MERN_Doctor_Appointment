import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { Toaster, toast } from "react-hot-toast";
const Login = ()=>{
    const[loginData, setLoginData] = useState({
        email:'',
        password:''
    })
    const navigate = useNavigate()

    const handleChange =(event)=>{
        const {name, value} =event.target
        setLoginData({...loginData, [name]:value})
    }
    async function loginFetch(){
        let response = await fetch('http://localhost:5000/api/login-user',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({'email':loginData.email,'password':loginData.password})
    })
    let result = await response.json()
    console.log("Login result: ", result)
    if(result.status){
        toast.success(result.message)
        sessionStorage.setItem('token',`${result.jwttoken}`)
        sessionStorage.setItem('userId',`${result.userId}`)
        setTimeout(()=>{
            setLoginData({
                email:'',
                password:''
            })
            navigate('/')
        },900)
    }
    else{
        toast.error(result.message)
    }
    }

    const handleSubmit =(e)=>{
        e.preventDefault()
        loginFetch()
    }

    return (
        <>
            <div className="bg-[#E2F4C5] w-full h-screen flex flex-col justify-center items-center flex-wrap text-xl phone:text-base ">
                <Toaster />
                <h3 className="text-3xl font-bold py-4 phone:text-xl sm:text-2xl">User Login</h3>
                <form className="bg-[#FCFFE0] mb-16 w-96 border border-black p-4 text-lg phone:text-base sm:text-base phone:w-72" onSubmit={(e)=>handleSubmit(e)}>
                    <Input type="text" name='email' value={loginData.email} onChange={handleChange} placeholder='Email' className='emailIp mb-4 bg-[#FCFFE0]' label='Email'  />
                    <Input type="password" name='password' value={loginData.password} onChange={handleChange} placeholder='Password' className='passwordIp mb-2 bg-[#FCFFE0]' label='Password' />
                    <Button className="my-3 bg-[#a5d29a] border border-gray-400 hover:bg-[#aae09c] hover:border-gray-100 phone:p-1.5" type="submit">Login</Button>
                        <p className="py-1">Don't have account,<Link to='/register'><span className=" text-blue-600 underline">create here</span></Link></p>
                        <p>Login as a <Link to ='/doctor-login' ><span className="text-blue-600 underline">Doctor</span></Link></p>
                </form>
            </div>
        </>
    )
}
export default Login;