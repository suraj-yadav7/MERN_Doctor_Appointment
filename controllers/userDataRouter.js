import express from 'express'
import {UserRegister} from '../models/user.models.js'
import {DoctorRegistration} from '../models/doctor.model.js'
const userDataRouter = express.Router()

userDataRouter.post('/getUserData',async (req,res)=>{
    console.log("id's: ", req.headers)
    try{
        let userId=req.headers['userid']
        let doctorId=req.headers['doctorid']
        console.log("doctor: ", typeof(doctorId), doctorId,'userId: ', typeof(userId), userId)
        if(doctorId !== 'null'){
            let doctorData = await DoctorRegistration.findOne({_id:doctorId})
                if(doctorData){
                    return res.status(200).json({status:true, message:'Found Doctor Details', data:{name:doctorData.fullname, email:doctorData.email, isAdmin:false}})
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
                return res.status(200).json({status:true,message:'Found User', data:{name:userdata.name, email:userdata.email, isAdmin:userdata.isAdmin, isDoctor:false, notification:userdata.isNotification, seenNotification:userdata.seenNotification}})
            }
        }  
    }
    catch(error){
        console.log("Error occures while getting user data ", error)
        return res.status(400).json({status:false, message:'Error while gettinf user data'})
    }
});

export default userDataRouter;