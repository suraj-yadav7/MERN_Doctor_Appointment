import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useDispatch } from 'react-redux'
import { adduser } from '../redux/features/userProfileSlice'
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const Home = () => {

const dispatch = useDispatch();
const [selectedDate, setSelectedDate] = useState(null);
const [drList, setDrList] = useState('')

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
    dispatch(adduser(userData.data))
  }
  catch(error){
    console.log("Error while posting getuserdata api", error)
  }
}

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

const handleDateChange = (date) => {

  // Formatted string date passed to schema
  const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()} ${date.toLocaleTimeString()}`;

  // this date to for date picker 
  setSelectedDate(date);
};



console.log("date: ", selectedDate)
  useEffect(()=>{
    authUser();
    doctorList()
  },[]);
  return (
    <>
    <Layout>
      <div>
        <h2 className='text-green-200'>Book Your Appointment</h2>
        <h4>Our Well Qualified Doctors</h4>
        <div className='drMainContainer  flex flex-wrap gap-4 border border-red-100'>
          {drList && drList.map((dr)=>(

            <div className='drCard border border-gray-800'>
            <p>Doctor Name:{dr.drName}</p>
            <p>Specialist:{dr.specialization}</p>
            <p>Doctor Fees:{dr.fees}</p>
            <p>Available 10am to 2pm</p>
            <div>
            <DatePicker className='border border-gray-500'
              selected={selectedDate}
              onChange={(date)=>handleDateChange(date)}
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
            <button>Book Now</button>
          </div>  
          ))}
        </div>
      </div>
    </Layout>
    </>
  )
};

export default Home;