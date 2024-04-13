import React from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const Register = ()=>{

    const handleSubmit=(e)=>{
        e.preventDefault
        console.log("submiot")
    }
    return (
        <>
            <div className="w-full h-screen flex flex-col justify-center items-center text-lg">
                <h3 className="text-4xl font-bold py-4">Register Page</h3>
                <form className="mb-16 w-96 border-2 border-black p-4" onSubmit={()=>handleSubmit(e)}>
                    <Input type="text" placeholder='Username' className='nameIp my-2' label='Name' required={true}/>
                    <Input type="email" placeholder='Email' className='emailIp my-2' label='Email' required={true} />
                    <Input type="password" placeholder='Password' className='passwordIp my-2' label='Password' required={true}/>
                    <Button className="my-2" type="submit">Register</Button>
                    <p className=" py-2">Already a user, <Link to='/login'><span className="text-blue-600 underline">Login here</span></Link></p>
                </form>
            </div>
        </>
    )
};
export default Register;