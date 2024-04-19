import express from 'express'
import {UserRegister} from '../models/user.models.js'
const userDataRouter = express.Router()

userDataRouter.post('/getUserData',async (req,res)=>{
    try{
        console.log('second')
        let userID = req.body.userId
        let userdata= await UserRegister.findOne({userID})
        if(!userdata){
            return res.status(400).json({status:'false',message:'unable to find user'})
        }
        else{
            return res.status(200).json({status:true,message:'Found User', data:{name:userdata.name, email:userdata.email}})
        }
    }
    catch(error){
        console.log("Error occures while getting user data", error)
        return res.status(400).json({status:false, message:'Error while gettinf user data'})

    }
})

export default userDataRouter;