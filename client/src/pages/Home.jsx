import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { adduser } from '../redux/features/userProfileSlice'
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast, { Toaster } from 'react-hot-toast'
import Appointments from '../components/Appointments';
import UserAppointment from '../components/UserAppointment';
import Profile from '../components/Profile';
import DoctorList from '../components/DoctorList';


const Home = () => {

const dispatch = useDispatch();
const [userData, setUserData] = useState('')
const [selectedDate, setSelectedDate] = useState(null);
const [stringDate, setStringDate] = useState('')
const [drID, setDrID] = useState('')
const [drList, setDrList] = useState('')

// With this varaibles the different components will be rendered
// like user comp, doctor, admin
const data=useSelector((state)=> state.user.userData)
let isAdmin = data.isAdmin
let isDoctor = data.isDoctor
let userId= sessionStorage.getItem('userId')

const authUser=async()=>{
  try{
    let response = await fetch('http://localhost:5000/api/getUserData',{
      method:'POST',
      headers:{
        authorization:'Bearer '+sessionStorage.getItem('token'),
        userid:sessionStorage.getItem('userId'),
        doctorid:sessionStorage.getItem('doctorId'),
      }
    })
    let userData = await response.json();
    setUserData(userData.data)
    dispatch(adduser(userData.data))
  }
  catch(error){
    console.log("Error while posting getuserdata api", error)
  }
}

// fetching doctor list for user
const doctorList=async()=>{
  try{
    let response = await fetch("http://localhost:5000/api/get-doctorList",{
      method:'GET',
      headers:{
        'Content-Type':'application/json'
      }
    })
    let result = await response.json()
    console.log("DrList: ", result.drData)
    setDrList(result.drData)
  }
  catch(error){
    console.log("error occured while getting doctore list: ", error)
  }
}

const startTime = new Date();
startTime.setHours(9, 30);

const endTime = new Date();
endTime.setHours(13, 30)

const handleDateChange = (date,id) => {

  // Formatted string date passed to schema
  const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()} ${date.toLocaleTimeString()}`;

  // this date to for date picker 
  setSelectedDate(date);
  setDrID(id)
  setStringDate(formattedDate)
};
const handleBookAppointment = async(drData)=>{
  if(drData.drId==drID){
    try{
      let response = await fetch('http://localhost:5000/api/doctor-appointment',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({patientname:userData.name, patientid:sessionStorage.getItem('userId'), doctorid:drData.drId, doctorname:drData.drName, doctorspecilztn:drData.specialization, doctorfees:drData.fees, appointdate:stringDate})
      })

      let result = await response.json()
      console.log("appointment booking: ", result)
      if(result.status){
        toast.success(result.message)
      }
      else{
        toast.error(result.message)
      }
    }
    catch(error){

    }
  }
  else{
  toast.custom(<div className='border border-blue-400 rounded-md'>Please select Appointment date first.</div>)
  }
}

useEffect(()=>{
    authUser();
    if(!isAdmin && !isDoctor){
      doctorList()
    }
  },[]);
  return (
    <>
    <Layout>
      {
        isAdmin? <DoctorList />: isDoctor? <Appointments/> :
      <div>
        <Toaster />
        <h2 className='text-3xl py-2'>Book Your Appointment</h2>
        <h5 className='text-2xl py-1'>Our Well Qualified Doctors</h5>
        <div className='drMainContainer text-2xl flex flex-wrap gap-6 border border-red-100'>
          {drList && drList.map((dr)=>(

            <div className='drCard border border-gray-800 p-3' key={dr.drId}>
              <p>Doctor Name:{dr.drName}</p>
              <p>Specialist:{dr.specialization}</p>
              <p>Doctor Fees:{dr.fees}</p>
              <p>Available 10am to 2pm</p>
              <div>
              <DatePicker className='border border-gray-500'
                selected={drID==dr.drId?selectedDate:''}
                onChange={(date)=>handleDateChange(date,dr.drId)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                dateFormat="MMMM d, yyyy h:mm aa"
                timeCaption="Time"
                placeholderText="Select date and time"
                minTime={startTime}
                maxTime={endTime} />
              <label><i className="fa-regular fa-calendar-days"></i></label>
              </div>
            <button onClick={()=> handleBookAppointment(dr)} className='border border-gray-600 rounded-md my-2 mt-4 px-1 bg-[#7ABA78] text-white hover:bg-[#8ddd8b] hover:text-white'>Book Now</button>
          </div>  
          ))}
        </div>
      </div>
      }
    </Layout>
    </>
  )
};

export default Home;