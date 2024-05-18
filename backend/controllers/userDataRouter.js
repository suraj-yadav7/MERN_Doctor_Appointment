import express from 'express'
import {UserRegister} from '../models/user.models.js'
import {DoctorRegistration} from '../models/doctor.model.js'
const userDataRouter = express.Router()

userDataRouter.post('/getUserData',async (req,res)=>{
    try{
        let userId=req.headers['userid']
        let doctorId=req.headers['doctorid']
        if(doctorId !== 'null'){
            let doctorData = await DoctorRegistration.findOne({_id:doctorId})
                if(doctorData){
                    return res.status(200).json({status:true, message:'Found Doctor Details', data:{userid:doctorData._id.valueOf(), name:doctorData.fullname, email:doctorData.email,
                    specialist:doctorData.specialization,
                    Qualification:doctorData.qualification,pendingAppoints:doctorData.appoinmentsPending.length,totalAppoints:doctorData.appointmentsHistory.length, gender:doctorData.gender, isAdmin:false, isDoctor:true}})
                }
                else{
                    return res.status(400).json({status:false, message:'Unable to find Doctor'})
                }
        }
        else{
            let userdata= await UserRegister.findOne({_id:userId})
            if(!userdata){
                return res.status(400).json({status:'false',message:'unable to find user'})
            }
            else{
                return res.status(200).json({status:true,message:'Found User', data:{userid:userdata._id.valueOf(), name:userdata.name, email:userdata.email, gender:userdata.gender, totalAppoints:userdata.appointmentBooked.length, isAdmin:userdata.isAdmin, isDoctor:false, notification:userdata.isNotification, seenNotification:userdata.seenNotification}})
            }
        }  
    }
    catch(error){
        console.log("Error occures while getting user data ", error)
        return res.status(400).json({status:false, message:'Error while gettinf user data'})
    }
});

export default userDataRouter;