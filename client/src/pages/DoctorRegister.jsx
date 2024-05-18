import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate } from 'react-router-dom';

const DoctorRegister = () => {
  const [doctorRegData, setDoctorRegData] = useState({
    fullname:'',
    email:'',
    password:'',
    gender:'',
    qualification:'',
    specialization:'',
    experience:'',
    fees:''
  })
  
  const handleChange=(event)=>{
    const {name, value} = event.target
    setDoctorRegData({...doctorRegData, [name]:value})
  }

  const navigate = useNavigate()

  const createDocAcc = async()=>{
    try{

      let response = await fetch('http://localhost:5000/api/doctor-register',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({fullname:doctorRegData.fullname.trim(),email:doctorRegData.email,password:doctorRegData.password, gender:doctorRegData.gender, qualification:doctorRegData.qualification,specialization:doctorRegData.specialization.trim(),experience:doctorRegData.experience, fees:doctorRegData.fees})
        
      })
      let result = await response.json()
      console.log("doctor res: ", result)
      if(result.status){
        setDoctorRegData({
          fullname:'',
          email:'',
          password:'',
          gender:'male',
          qualification:'',
          specialization:'',
          experience:'',
          fees:''
        })
        toast.success(result.message,{duration:4000})
      }else{
        toast.error(result.message)
      }
    }
    catch(error){
      console.log("Failed to post Doctor register data", error)
    }
  }

  console.log("dr: ", doctorRegData)
  const handleSubmit =(e)=>{
    e.preventDefault()
    createDocAcc()
  }
  return (
    <>
      <div className="bg-[#CDE8E5] w-full  flex flex-col justify-center items-center text-xl phone:text-base">
          <Toaster
                position="top-center"
                  reverseOrder={false}
          />
          <h3 className="text-3xl font-bold py-4 phone:text-xl sm:text-2xl">Doctor Registration Page</h3>
          <form className=" bg-[#EEF7FF] mb-16 w-96 border border-black p-4 text-lg phone:text-base sm:text-base phone:w-72" onSubmit={(e)=>handleSubmit(e)}>
              <Input type="text" name='fullname' value={doctorRegData.fullname} onChange={handleChange} placeholder='full name' className='nameIp bg-[#EEF7FF]' label='Name' />
              <Input type="text" name="email" value={doctorRegData.email} onChange={handleChange} placeholder='Email' className='emailIp bg-[#EEF7FF]' label='Email'  />
              <Input type="password" name="password" value={doctorRegData.password} onChange={handleChange} placeholder='Password' className='passwordIp bg-[#EEF7FF]' label='Password' />
              <div className='genderIp my-2'>
                <span className='mr-2'>Gender: </span>
                <label className='mr-2' htmlFor='3'>Male</label>
                <input type='radio' name='gender' value='male' onChange={handleChange} className='mr-8 ' id='3'/>
                <label htmlFor='4' className='mr-2'>Female</label>
                <input type='radio' name='gender' value='female' onChange={handleChange} id='4' />
              </div>
              <div className='qualiIp my-4'>
                <span className='mr-6'>Qualification: </span>
                <select onChange={handleChange} name='qualification' value={doctorRegData.qualification} className='border border-gray-400 border-spacing-x-4 bg-[#EEF7FF]'>
                  <option value='' >select</option>
                  <option value='MBBS'>MBBS</option>
                  <option value='MD'>MD</option>
                  <option value='Nursing'>Nursing</option>
                </select>
              </div>
              <Input type='text' name='specialization' value={doctorRegData.specialization} placeholder='specialization' onChange={handleChange} label='Specialization' className='bg-[#EEF7FF]'/>
              <Input type='number' name='experience' value={doctorRegData.experience} placeholder='exp' onChange={handleChange} label='Experience'className='bg-[#EEF7FF]' />
              <Input type='number' name='fees' value={doctorRegData.fees} placeholder='fees' min='100' max='1200' maxLength='4' onChange={handleChange} label='Fees' className='bg-[#EEF7FF]' />
              <Button className="my-2 bg-[#85c2ba] hover:bg-[#a3e5dd] phone:p-1.5" type="submit">Register</Button>
              <p className=" py-2">Already a sign up, <Link to='/doctor-login'><span className="text-blue-600 underline">Login here</span></Link></p>
            </form>
      </div>
    </>
  )
}

export default DoctorRegister;