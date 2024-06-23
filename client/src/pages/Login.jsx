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
    const[loadingInfo, setLoadingInfo] = useState(false)
    const [guest, setGuest]=useState(true)
    const navigate = useNavigate()
    const base_url = import.meta.env.VITE_BASE_URL

    const handleChange =(event)=>{
        const {name, value} =event.target
        setLoginData({...loginData, [name]:value})
    }
    async function loginFetch(){
        setLoadingInfo(true)
        let response = await fetch(`${base_url}/api/login-user`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'email':loginData.email,'password':loginData.password})
        })
    let result = await response.json()
    setLoadingInfo(false)
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
    // Guest login
    const handleGuest=()=>{
        if(guest){
            setLoginData({
                email:'guestlogin@gmail.com',
                password:'guest123'
            })
            toast.success("email and password updated, click on Login",{duration:4000})
            setGuest(false)
        }else{
            loginFetch()
        }
    }

    return (
        <>
            <div className="bg-[#E2F4C5] w-full h-screen flex flex-col justify-center items-center flex-wrap text-xl phone:text-base ">
                <Toaster />
                <h3 className="text-3xl font-bold py-4 phone:text-xl sm:text-2xl">User Login</h3>
                <form className="bg-[#FCFFE0]  w-96 border border-black p-4 text-lg phone:text-base sm:text-base phone:w-72" onSubmit={(e)=>handleSubmit(e)}>
                    <Input type="text" name='email' value={loginData.email} onChange={handleChange} placeholder='Email' className='emailIp mb-4 bg-[#FCFFE0]' label='Email'  />
                    <Input type="password" name='password' value={loginData.password} onChange={handleChange} placeholder='Password' className='passwordIp mb-2 bg-[#FCFFE0]' label='Password' />
                    <Button className="my-3 bg-[#a5d29a] border border-gray-400 hover:bg-[#aae09c] hover:border-gray-100 phone:p-1.5" type="submit">Login</Button>
                    
                        <p className="py-1">Don't have account,<Link to='/register'><span className=" text-blue-600 underline">create here</span></Link></p>
                        <p>Login as a <Link to ='/doctor-login' ><span className="text-blue-600 underline">Doctor</span></Link></p>
                </form>
                    <div className="flex flex-col mb-8">
                        <Button className="mt-2 bg-[#27c2e5] border border-gray-600 hover:bg-[#6fcde2] hover:border-gray-100 phone:p-1.5" type="submit" onClick={handleGuest}>Login as Guest</Button>
                        <span className="text-sm">(Email, password not required)</span>
                    </div>
                {
                loadingInfo && 
                <div className="w-full h-screen  flex justify-center items-center bg-slate-400 bg-opacity-60 absolute top-50">
                <div className="p-4 h-20 border flex justify-center items-center item-center border-green-300 rounded-lg z-10 bg-white ">
                    <h3 className="text-center">Please wait Because it's a free server,<br/> It takes time...</h3>
                </div>
                </div>
            }
            </div>
     
        </>
    )
}
export default Login;