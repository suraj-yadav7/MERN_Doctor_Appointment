import express from 'express'
import { DoctorRegistration } from '../models/doctor.model.js';
import { UserRegister } from '../models/user.models.js';
import { PatientAppointment } from '../models/appointment.model.js';

const AppAccApproval = express.Router();

// $$$$$$ Account Approval $$$$$$$$$
// doctor register and request for account approval from admin
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
                    let splicedNotification = notification.splice(index,1)
                    splicedNotification[0].data.approveStatus='Accepted'
                    seenNotific.push(splicedNotification[0]);
                    await UserRegister.findByIdAndUpdate(adminExist._id.valueOf(), {isNotification:notification, seenNotification:seenNotific})
                    return res.status(200).json({status:true, message:'Doctor Profile Approved'});
                }
            }
        }
        else{
            return res.status(400).json({status:false, message:`Doctor don't exist`});
        }
    }
    catch(error){
        console.log("Error occured while doctor approve: ", error);
        return res.status(400).json({status:false, message:"Error at doctor approval"});
    }
    });

    // Doctor profile rejected by admin
    AppAccApproval.post('/reject-doctor', async(req, res)=>{
        let doctorId = req.body.doctorid
        try{
            let doctorExist = await DoctorRegistration.findById(doctorId);
            if(doctorExist){
                let response = await DoctorRegistration.findByIdAndUpdate(doctorId, {approveStatus:"Rejected"});
            if(response){
                let adminExist = await UserRegister.findOne({isAdmin:true})
                if(adminExist){
                    let notific = adminExist.isNotification
                    let seenNotific = adminExist.seenNotification
                    let index = notific.findIndex((elem)=> elem.data.doctorid == doctorId)
                    let splicedNotific = notific.splice(index, 1)
                    splicedNotific[0].data.approveStatus='Rejected'
                    seenNotific.push(splicedNotific[0])
                    await UserRegister.findByIdAndUpdate(adminExist._id.valueOf(), {isNotification:notific, seenNotification:seenNotific});
                    res.status(200).json({status:true, message:"Doctor Profile is Rejected"})
                }
            }
        }
        else{
            res.status(400).json({status:false, message:"Doctor Don't exist"});
        }
    }
    catch(error){
        console.log("Error occured while rejecting doctor ", error)
        res.status(400).json({status:false, mesaage:'Error at rejecting doctor profile'});
    }
    });


// $$$$$$$$ User Appointment $$$$$$$$$$
// Insertion of patient appointments in core colllection, doctor and user also
AppAccApproval.post('/doctor-appointment', async(req, res)=>{
    let doctorId=req.body.doctorid
    let patientId=req.body.patientid
    try{
        // Insert patient appointments in  core appoinment collections
        // All patients appointments will present ther
        if(doctorId && patientId){
            let appointment = await PatientAppointment.create({
                patientId:req.body.patientid,
                patientName:req.body.patientname,
                doctorId:req.body.doctorid,
                doctorName:req.body.doctorname,
                doctorSpecialztn:req.body.doctorspecilztn,
                doctorFees:req.body.doctorfees,
                dateofAppnt:req.body.appointdate,
            });

            // Inserting appointment list in doctor collection
            let appointId=appointment._id.valueOf()

            let doctorExist = await DoctorRegistration.findById(doctorId);
            if(doctorExist){
            let pendingAppont=doctorExist.appoinmentsPending
            let pendingAppointData = {
                appointmentId:appointId,
                patientId:req.body.patientid,
                patientName:req.body.patientname,
                appointDate:req.body.appointdate,
                approveStatus:'Pending'
            }
            pendingAppont.push(pendingAppointData)
            
            await DoctorRegistration.findByIdAndUpdate(doctorId, {appoinmentsPending:pendingAppont});
        }
        
        // Inserting appointmnet in user(patient) collection
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
                approveStatus:'Pending'
            }
            bookedAppoint.push(patientAppointData)
            await UserRegister.findByIdAndUpdate(patientId, {appointmentBooked:bookedAppoint});
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


//Each Doctor pending appointment list response to client component
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

// Each Doctor previous/history appointment list response to client component
AppAccApproval.post('/appointment-history', async(req,res)=>{
    let doctorId =req.body.doctorid
    try{
        let doctorExist = await DoctorRegistration.findById(doctorId)
        if(doctorExist){
            let appointHistory = doctorExist.appointmentsHistory
            res.status(200).json({status:true, message:'Doctor appointment history found', data:appointHistory})
        }
        else{
            res.status(400).json({statusflase, mesaage:'Doctor not found'})
        }
    }
    catch(error){
        console.log("Error occured while getting Dr appointment history list", error)
        res.status(400).json({status:false, message:'Unexpected Error'})
    }
})

// Doctor approve patient appointment request.
AppAccApproval.post('/accept-appointment', async(req,res)=>{
    let appointmentId=req.body.appointmentid;
    let patientId= req.body.patientid
    let doctorId=req.body.doctorid
    try{
        let appointmentExist = await PatientAppointment.findById(appointmentId)
        if(appointmentExist){
            let status=appointmentExist.appointStatus
            if(status=='Pending'){
               let patientResponse= await PatientAppointment.findByIdAndUpdate(appointmentId, {appointStatus:"Accepted"})

               let doctorExist = await DoctorRegistration.findById(doctorId)
               if(doctorExist){
                   let pendingAppon = doctorExist.appoinmentsPending
                   let index = pendingAppon.findIndex((appoint) => appoint.appointmentId==appointmentId)
                   let sliceAppoint = pendingAppon.splice(index,1)
                   sliceAppoint[0].approveStatus="Accepted"
                   const appontHistory= doctorExist.appointmentsHistory
                   appontHistory.push(sliceAppoint[0])
                   await DoctorRegistration.findByIdAndUpdate(doctorId, {appoinmentsPending:pendingAppon,appointmentsHistory: appontHistory})
                   
                   let userExist = await UserRegister.findById(patientId)
                   if(userExist){
                       let userAppoint= userExist.appointmentBooked
                       let updateArr = userAppoint.map((apponit)=> {
                           if(apponit.appointmentId == appointmentId){
                               apponit.approveStatus='Accepted'
                            }
                        })
                        await UserRegister.findByIdAndUpdate(patientId, {appointmentBooked:userAppoint})
                    }
                }
            }
        }
        res.status(200).json({status:true, appointmentid: appointmentId, message:'Appointment Confirmed  '});
    }
    catch(error){
        console.log("Error occured while approving patient appointment: ", error)
        res.status(400).json({status:false, message:'Error occur at approving patient appointment'})
    }
})

// Doctor Rejects patient appointment
AppAccApproval.post("/reject-appointment", async(req, res)=>{
    let patientId=req.body.patientid
    let doctorId=req.body.doctorid
    let appointmentId=req.body.appointmentid
    try{
        // Changing pending status to reject in PatientAppointment collection
        let appointmentExist = await PatientAppointment.findById(appointmentId)
        if(appointmentExist){
            let status=appointmentExist.appointStatus
            if(status=='Pending'){
                await PatientAppointment.findByIdAndUpdate(appointmentId, {appointStatus:"Rejected"})

            // let update rejection in doctor appointment historylist
            let doctorExist = await DoctorRegistration.findById(doctorId)
            if(doctorExist){
                let pendingAppon = doctorExist.appoinmentsPending
                let index = pendingAppon.findIndex((appoint) => appoint.appointmentId==appointmentId)
                let sliceAppoint = pendingAppon.splice(index,1)
                sliceAppoint[0].approveStatus="Rejected"
                const appontHistory= doctorExist.appointmentsHistory
                appontHistory.push(sliceAppoint[0])
                await DoctorRegistration.findByIdAndUpdate(doctorId, {appoinmentsPending:pendingAppon,appointmentsHistory: appontHistory})

                let userExist = await UserRegister.findById(patientId)
                   if(userExist){
                       let userAppoint= userExist.appointmentBooked
                       let updateArr = userAppoint.map((apponit)=> {
                           if(apponit.appointmentId == appointmentId){
                               apponit.approveStatus='Rejected'
                            }
                        })
                        await UserRegister.findByIdAndUpdate(patientId, {appointmentBooked:userAppoint})
                    }
                }
            }
        }
        res.status(200).json({status:true, message:"Patient appointment rejected", appointmentid:appointmentId})
    }
    catch(error){
        console.log("Error occured while rejecting patient appointment: ", error)
        res.status(400).json({status:false, message:'Error while rejection appointment'})
    }
})


// User cum patient all appointments list of pending, approve, rejected response to component
AppAccApproval.post('/user-appointments', async(req, res)=>{
    let userId=req.body.userid
    try{
        let userExist = await UserRegister.findById(userId)
        if(userExist){
            let allAppointList = userExist.appointmentBooked
            return res.status(200).json({status:true, message:"User appointment list found", data:allAppointList})
        }
        else{
            return res.status(400).json({status:false, message:"Doctor appointment list not found"})
        }
    }
    catch(error){
        console.log("Error occured while geting user appointments list: ", error)
        res.status(400).json({status:false, message:"Error at geting user appointment list"})
    }
})

export default AppAccApproval;