import React from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
const Login = ()=>{
    return (
        <>
            <div className="w-full h-screen flex flex-col justify-center items-center text-lg">
                <h3 className="text-4xl font-bold py-4">Login</h3>
                <form className="mb-16 w-96 border-2 border-black p-4" onSubmit={()=>handleSubmit(e)}>
                    <Input type="email" placeholder='Email' className='emailIp mb-4' label='Email' required={true} />
                    <Input type="password" placeholder='Password' className='passwordIp mb-2 ' label='Password' required={true}/>
                    <Button className="my-3 " type="submit">Login</Button>
                        <p className="py-1">Don't have account,<Link to='/register'><span className="text-blue-600 underline">create here</span></Link></p>
                </form>
            </div>
        </>
    )
}

export default Login;