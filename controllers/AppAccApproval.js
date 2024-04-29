import express from 'express'
import { DoctorRegistration } from '../models/doctor.model.js';
import { UserRegister } from '../models/user.models.js';

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
                    console.log("seen notifcationL: ", seenNotific)
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

export default AppAccApproval;