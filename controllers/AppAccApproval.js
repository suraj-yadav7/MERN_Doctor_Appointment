import express from 'express'
import { DoctorRegistration } from '../models/doctor.model.js';
import { UserRegister } from '../models/user.models.js';
import { PatientAppointment } from '../models/appointment.model.js';

const AppAccApproval = express.Router();

AppAccApproval.post('/account-approval', async(req, res)=>{
    let id = req.body.doctorid;
    try{
        let doctorExist  = await DoctorRegistration.findById(id);
        if(doctorExist){
            let response = await DoctorRegistration.findByIdAndUpdate(id,{approveStatus:"Approved"});
            if(response){
                let adminExist = await UserRegister.findOne({isAdmin:true})
                if(adminExist){
                    let notification = adminExist.isNotification
                    let seenNotific =adminExist.seenNotification
                    let index = notification.findIndex((doctor)=> doctor.data.doctorid == id)
                    seenNotific.push(notification[index])
                    let updateNotification = notification.splice(index,1)
                    await UserRegister.findByIdAndUpdate(adminExist._id.valueOf(), {isNotification:notification, seenNotification:seenNotific})
                    return res.status(200).json({status:true, mesaage:'User Approved & Admin updated'})
                }
            }
        }
        else{
            return res.status(400).json({status:false, message:`Doctor don't exist`})
        }
    }
    catch(error){
        console.log("Error occured while doctor approve: ", error)
        return res.status(400).json({status:false, message:"Error at doctor approval"})
    }
    });


AppAccApproval.post('/doctor-appointment', async(req, res)=>{
    let doctorId=req.body.doctorid
    let patientId=req.body.patientid
    try{
        // insert data in appoinment schema, all appointment data will be present in that
        if(doctorId && patientId){
            let appointment = await PatientAppointment.create({
                patientId:req.body.patientid,
                patientName:req.body.patientname,
                doctorId:req.body.doctorid,
                doctorName:req.body.doctorname,
                doctorSpecialztn:req.body.doctorspecilztn,
                doctorFees:req.body.doctorfees,
                dateofAppnt:req.body.appointdate,
            })

            // update doctor appointment list
            let appointId=appointment._id.valueOf()

            let doctorExist = await DoctorRegistration.findById(doctorId)
            if(doctorExist){
            let pendingAppont=doctorExist.appoinmentsPending
            let pendingAppointData = {
                appointmentId:appointId,
                patientId:req.body.patientid,
                patientName:req.body.patientname,
                appointDate:req.body.appointdate,
            }
            pendingAppont.push(pendingAppointData)
            
            await DoctorRegistration.findByIdAndUpdate(doctorId, {appoinmentsPending:pendingAppont})
        }
        
        // updating user appointment list
        let userExist = await UserRegister.findById(patientId)
        if(userExist){
            let bookedAppoint=userExist.appointmentBooked
            let patientAppointData={
                appointmentId:appointId,
                doctorId:req.body.doctorid,
                doctorName:req.body.doctorname,
                healthissueDept:req.body.doctorspecilztn,
                doctorFees:req.body.doctorfees,
                appointDate:req.body.appointdate,
            }
            bookedAppoint.push(patientAppointData)
            await UserRegister.findByIdAndUpdate(patientId, {appointmentBooked:bookedAppoint})
        }
        return res.status(200).json({status:true, message:'Appointment is booked'})
        }
        else{
            res.status(400).json({status:false, message:'Invalid request'})
        }
    }
    catch(error){
        console.log("error while updating appointment data: ", error)
        return res.status(400).json({status:400, message:'Error at adding appointment data'});
    }
        
    });


// doctor appointment list 

AppAccApproval.post('/appointment-list', async(req, res)=>{
    let doctorId = req.body.doctorid
    try{
        let doctorExist = await DoctorRegistration.findById(doctorId)
        if(doctorExist){
            let pendingList = doctorExist.appoinmentsPending
            res.status(200).json({status:true, message:'Patient pending appointment list success', data:pendingList})
        }
        else{
            res.status(400).json({status:false, message:'error in finding doctor appointment list'})
        }
    }
    catch(error){
        console.log("Error while getting doctor pending appointment list: ", error)
        res.status(400).json({status:false, message:'error occured at doctor pending appointment list'})
    }
})

AppAccApproval.post('/accept-appointment', async(req,res)=>{
    let appointmentId=req.body.appointmentid
    let patientId= req.body.patientid
    let doctorId=req.body.doctorid
    try{
        let appointmentExist = await PatientAppointment.findById(appointmentId)
        if(appointmentExist){
            let status=appointmentExist.appointStatus
            if(status=='Pending'){
                await PatientAppointment.findByIdAndUpdate(appointmentId, {appointStatus:"Accepted"})
            }
        }

        let doctorExist = await DoctorRegistration.findById(doctorId)
        if(doctorExist){
            let pendingAppon = doctorExist.appoinmentsPending
            let index = pendingAppon.findIndex((appoint) => appoint.appointmentId==appointmentId)
            let sliceAppoint = pendingAppon.splice(index,1)

            const appontHistory= doctorExist.appointmentsHistory
            appontHistory.push(sliceAppoint)
            
            await DoctorRegistration.findByIdAndUpdate(doctorId, {appointmentsHistory: appontHistory})
        }
        
        res.status(400).json({status:true, message:'Confirmed appointment'})
    }
    catch(error){
        console.log("Error occured while approving patient appointment: ", error)
        res.status(400).json({status:false, message:'Error occur at approving patient appointment'})
    }
})


export default AppAccApproval;