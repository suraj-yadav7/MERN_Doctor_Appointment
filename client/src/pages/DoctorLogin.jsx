import React,{useState} from 'react'
import { useNavigate,Link } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import Input from '../components/Input'
import Button from '../components/Button'
const DoctorLogin = ()=>{

    const[drLogin, setDrLogin] = useState('')
    const navigate = useNavigate()
<<<<<<< Updated upstream
=======
    const base_url = import.meta.env.VITE_BASE_URL
>>>>>>> Stashed changes

    const handleChange =(event)=>{
        const {name, value} =event.target
        setDrLogin({...drLogin, [name]:value})
<<<<<<< Updated upstream
    }
=======
    };
>>>>>>> Stashed changes

    const doctorlogin = async()=>{
        try{

<<<<<<< Updated upstream
            let response = await fetch('http://localhost:5000/api/doctor-login',{
=======
            let response = await fetch(`${base_url}/api/doctor-login`,{
>>>>>>> Stashed changes
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({email:drLogin.email,password:drLogin.password })
            })
            let result = await response.json()
            if(result.status){
                toast.success(result.message)
                sessionStorage.setItem('token',result.jwttoken)
                sessionStorage.setItem('doctorId',result.doctorId)
                setDrLogin('')
                navigate('/')
            }
            else{
                toast.error(result.message)
            }
            console.log('DrLogin res: ', result)
        }
        catch(error){
            console.log('Failed to Post Doctor login data: ', error)
        }
    }

    const handleSubmit =(e)=>{
        e.preventDefault()
        doctorlogin()
    };

    return (
        <>
            <div className=" bg-[#CDE8E5] w-full h-screen flex flex-col justify-center items-center text-xl phone:text-base ">
                <Toaster />
                <h3 className=" text-3xl font-bold py-4 phone:text-xl sm:text-2xl ">Doctor's Login</h3>
                <form className="bg-[#EEF7FF] mb-16 w-96 border border-black p-4 text-lg phone:text-base sm:text-base phone:w-72" onSubmit={(e)=>handleSubmit(e)}>
                    <Input type="text" name='email' value={drLogin.email} onChange={handleChange} placeholder='Email' className='emailIp mb-4 bg-[#EEF7FF]' label='Email' />
                    <Input type="password" name='password' value={drLogin.password} onChange={handleChange} placeholder='Password' className='passwordIp mb-2 bg-[#EEF7FF]' label='Password' />
                    <Button className="my-3 border border-gray-400 bg-[#8bc2c2] hover:bg-[#9be7e7] phone:p-1.5" type="submit">Login</Button>
                        <p className="py-1">Don't have doctor account, <Link to='/doctor-register'><span className=" text-blue-600 underline">create one</span></Link></p>
                        <p className=" py-2">Login as user, <Link to='/login'><span className="text-blue-600 underline">Login here</span></Link></p>
                </form>
                
            </div>
        </>
    )
}

export default DoctorLogin;