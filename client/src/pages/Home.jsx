import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { adduser } from '../redux/features/userProfileSlice'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast, { Toaster } from 'react-hot-toast'
import Appointments from '../components/Appointments';
import DoctorList from '../components/DoctorList';
import Pagination from '../components/Pagination';


const Home = () => {
  //Dispatch this data to store
  const [userData, setUserData] = useState('')

  // Date handled current and string for database as per doctorid
  const [selectedDate, setSelectedDate] = useState(null);
  const [stringDate, setStringDate] = useState('')
  const [drID, setDrID] = useState('')
  
  // Below three state for user/patient data render in useffect
  const [drList, setDrList] = useState('')
  const [admin, setAdmin] = useState('')
  const [doctor, setDoctor] = useState('')
  
  const dispatch = useDispatch();

// Authenticate all user and send their data in store
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
    let userdata = await response.json();
    setAdmin(userdata.data.isAdmin)
    setDoctor(userdata.data.isDoctor)
    setUserData(userdata.data)
    dispatch(adduser(userdata.data))
  }
  catch(error){
    console.log("Error while posting getuserdata api", error)
  }
};

// fetching doctor list for user/patient
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
};

const startTime = new Date();
startTime.setHours(9, 30);

const endTime = new Date();
endTime.setHours(13, 30)

const handleDateChange = (date,id) => {

  //This Formatted string date passed to schema
  const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()} ${date.toLocaleTimeString()}`;

  // this actual date is for date picker working 
  setSelectedDate(date);
  setDrID(id)
  // string date for schema
  setStringDate(formattedDate)
};
// Appointment is booked by user
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
        setSelectedDate(null)
      }
      else{
        toast.error(result.message)
      }
    }
    catch(error){
    }
  }
  else{
  toast.custom(<div className='border-2 p-1 bg-white shadow-md  shadow-gray-300  border-blue-400 rounded-md text-2xl phone:text-base sm:text-lg'>Please select Appointment date first.</div>)
  }
};

// Pagination for user/patient 
const [currentPage, setCurrentPage] = useState(1)
let itemsPerPage=6
const startIndex = (currentPage-1)*itemsPerPage
const endIndex = startIndex+itemsPerPage
const onPageChange= (page)=>{
  setCurrentPage(page)
}
const slicedDrList = drList.slice(startIndex, endIndex)

useEffect(()=>{
    authUser();
    if(admin==false && doctor==false){
      doctorList();
    }
  },[]);


  return (
    <>
    <Layout>
      {
        admin? <DoctorList />: doctor? <Appointments/> :
      <div className=''>
        <Toaster   toastOptions={{style:{fontSize:'1.3rem' }}} />
        <h2 className='text-3xl py-2 phone:text-xl sm:text-2xl'>Book Your Appointment</h2>
        <h5 className='text-2xl py-1 phone:text-lg sm:text-xl'>Our Well Qualified Doctors</h5>
        <div className='drMainContainer justify-center items-center text-2xl flex flex-wrap gap-10 border border-red-100 '>
          {drList && drList.length>1?drList&& slicedDrList.map((dr)=>(

            <div className='drCard border flex justify-center items-center border-gray-800 p-3 capitalize min-h-64 phone:text-lg sm:text-xl 2xl:w-1/4 ' key=  {dr.drId}>
              <div>
                <p>Doctor Name: {dr.drName.split(' ')[0]}</p>
                <p>Specialist: {dr.specialization.split(' ')[0]}</p>
                <p>Doctor Fees: {dr.fees}</p>
                <p>Available 10am to 2pm</p>
                <div>
                <DatePicker className='border border-gray-500 w-50 text-xl phone:w-44'
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
                  <span><i className="fa-regular fa-calendar-days ml-2"></i></span>
                </div>
                <button button onClick={()=> handleBookAppointment(dr)} className='border border-gray-600 rounded-md my-2 mt-4 px-1 bg-[#7ABA78] text-white hover:bg-[#8ddd8b] hover:text-white'>Book Now</button>
            </div>  
          </div>
          )) :<div><h4>Fething Doctor List.... </h4></div>}
        </div>
        {
          drList && drList.length>0?
          <Pagination  dataLen={drList.length} currentPage={currentPage} itemsPerPage={itemsPerPage} onPageChange={onPageChange}/>:""
        }
      </div>
      }
    </Layout>
    </>
  )
};

export default Home;