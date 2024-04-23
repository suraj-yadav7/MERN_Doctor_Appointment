import express from 'express'
import {UserRegister} from '../models/user.models.js'
const userDataRouter = express.Router()

userDataRouter.post('/getUserData',async (req,res)=>{
    try{
        let userId=req.headers['userid']
        let userdata= await UserRegister.findOne({_id:userId})
        if(!userdata){
            return res.status(400).json({status:'false',message:'unable to find user'})
        }
        else{
            return res.status(200).json({status:true,message:'Found User', data:{name:userdata.name, email:userdata.email, isAdmin:userdata.isAdmin, isDoctor:userdata.isDoctor, notification:userdata.isNotification, seenNotification:userdata.seenNotification}})
        }
    }
    catch(error){
        console.log("Error occures while getting user data", error)
        return res.status(400).json({status:false, message:'Error while gettinf user data'})
    }
})

export default userDataRouter;