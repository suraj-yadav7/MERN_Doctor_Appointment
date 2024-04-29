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
            <div className="w-full h-screen flex flex-col justify-center items-center text-lg">
                <Toaster />
                <h3 className="text-4xl font-bold py-4">Login</h3>
                <form className="mb-16 w-96 border-2 border-black p-4" onSubmit={(e)=>handleSubmit(e)}>
                    <Input type="text" name='email' value={loginData.email} onChange={handleChange} placeholder='Email' className='emailIp mb-4' label='Email' required={true} />
                    <Input type="password" name='password' value={loginData.password} onChange={handleChange} placeholder='Password' className='passwordIp mb-2 ' label='Password' required={true}/>
                    <Button className="my-3 " type="submit">Login</Button>
                        <p className="py-1">Don't have account,<Link to='/register'><span className="text-blue-600 underline">create here</span></Link></p>
                        <p>Login as a <Link to ='/doctor-login' ><span className="text-blue-600 underline">Doctor</span></Link></p>
                </form>
                
            </div>
        </>
    )
}
export default Login;