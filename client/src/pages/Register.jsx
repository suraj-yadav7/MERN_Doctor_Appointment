import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import {toast,Toaster} from 'react-hot-toast'

const Register = ()=>{
    const [newUserData, setNewUserData] = useState({
        name:"",
        email:'',
        password:""
    })
    const navigate =useNavigate()

    const handleChange=(e)=>{
        const {name, value}=e.target
        setNewUserData({...newUserData, [name]:value})
    }
    const handleSubmit= (e)=>{
        e.preventDefault()
        console.log("submit")
        postUserData(newUserData)
    }

    async function postUserData(data){
        console.log('run')
        try{
            let postResponse = await fetch("http://localhost:5000/api/create-user",
            {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({name:data.name,email:data.email,password:data.password})
            })
            const result = await postResponse.json()
            console.log('Reuslt of post: ', result)
            if(result.status){
                setNewUserData({
                    name:"",
                    email:'',
                    password:""
                })
                toast.success(result.message)
                setTimeout(()=>{
                    navigate("/login")
                },1500)
            }
            else{
                toast.error(result.message)
            }
        }
        catch(error){
            console.log("Error failed to post data: ", error)
        }
        }
    
    return (
        <>
            <div className="w-full h-screen flex flex-col justify-center items-center text-lg">
            <Toaster
                 position="top-center"
                    reverseOrder={false}
            />
                <h3 className="text-4xl font-bold py-4">Register Page</h3>
                <form className="mb-16 w-96 border-2 border-black p-4" onSubmit={(e)=>handleSubmit(e)}>
                    <Input type="text" name='name' value={newUserData.name} onChange={handleChange} placeholder='Username' className='nameIp my-2' label='Name' required={true}/>
                    <Input type="text" name="email" value={newUserData.email} onChange={handleChange} placeholder='Email' className='emailIp my-2' label='Email' required={true} />
                    <Input type="password" name="password" value={newUserData.password} onChange={handleChange} placeholder='Password' className='passwordIp my-2' label='Password' required={true}/>
                    <Button className="my-2" type="submit">Register</Button>
                    <p className=" py-2">Already a user, <Link to='/login'><span className="text-blue-600 underline">Login here</span></Link></p>
                </form>
            </div>
        </>
    )
};
export default Register;