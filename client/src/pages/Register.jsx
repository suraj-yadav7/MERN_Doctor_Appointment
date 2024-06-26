import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import {toast,Toaster} from 'react-hot-toast'


const Register = ()=>{
    const [newUserData, setNewUserData] = useState({
        name:'',
        email:'',
        password:'',
        gender:''
    })
    const navigate =useNavigate()
<<<<<<< Updated upstream
=======
    const base_url = import.meta.env.VITE_BASE_URL

>>>>>>> Stashed changes

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
        try{
<<<<<<< Updated upstream
            let postResponse = await fetch("http://localhost:5000/api/create-user",
=======
            let postResponse = await fetch(`${base_url}/api/create-user`,
>>>>>>> Stashed changes
            {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({name:data.name,email:data.email,password:data.password,gender:data.gender})
            })
            const result = await postResponse.json()
            console.log('Register result: ', result)
            if(result.status){
                setNewUserData({
                    name:"",
                    email:"",
                    password:"",
                    gender:"",
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
            <div className=" bg-[#E2F4C5] w-full h-screen flex flex-col justify-center items-center text-xl phone:text-base">
            <Toaster
                 position="top-center"
                    reverseOrder={false}
            />
                <h3 className="text-3xl font-bold py-4 phone:text-xl sm:text-2xl">User Register Page</h3>
                <form className="bg-[#FCFFE0] mb-16 w-96 border border-black p-4 text-lg phone:text-base sm:text-base phone:w-72" onSubmit={(e)=>handleSubmit(e)}>
                    <Input type="text" name='name' value={newUserData.name} onChange={handleChange} placeholder='Username' className='nameIp my-2 bg-[#FCFFE0]' label='Name' />
                    <Input type="text" name="email" value={newUserData.email} onChange={handleChange} placeholder='Email' className='emailIp my-2 bg-[#FCFFE0]' label='Email'  />
                    <div className='genderIp my-2'>
                        <span className='mr-2'>Gender: </span>
                        <label className='mr-2' htmlFor='3'>Male</label>
                        <input type='radio' name='gender' value='male' onChange={handleChange} className='mr-8' id='3'/>
                        <label htmlFor='4' className='mr-2'>Female</label>
                        <input type='radio' name='gender' value='female' onChange={handleChange} id='4' />
                    </div>
                    <Input type="password" name="password" value={newUserData.password} onChange={handleChange} placeholder='Password' className='passwordIp my-2 bg-[#FCFFE0]' label='Password' />
                    <Button className="my-2 bg-[#a5d39b] hover:bg-[#bbebb1] hover:border-gray-100 phone:p-1.5" type="submit">Register</Button>
                    <p className=" py-2">Already a user, <Link to='/login'><span className="text-blue-600 underline">Login here</span></Link></p>
                </form>
            </div>
        </>
    )
};
export default Register;