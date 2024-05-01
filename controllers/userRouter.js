import express from 'express';
import bcrypt from 'bcryptjs'
import {UserRegister} from '../models/user.models.js'
import jwt from 'jsonwebtoken';
import {body,validationResult } from 'express-validator';

const userRouter = express.Router()

userRouter.post('/create-user', [
    body("name").isLength({min:4}),
    body("email").isEmail(),
    body("password").isLength({min:5})
],async(req, res)=>{
    let error = validationResult(req)
    if(!error.isEmpty()){
        if(error.errors[0].path=='password'){
            return res.status(400).json({status:false, message:"Password must be 5 digits"})
        }
        else if(error.errors[0].path=='name'){
            return res.status(400).json({status:false,message:"Name must be 4 letters"})
        }
        else{
            return res.status(400).json({status:false, message:"Provide valid email id"})
        }
    }
    else{
        let salt = await bcrypt.genSalt(10)
        const hashedPassword =await bcrypt.hash(req.body.password,salt)
        try{
            let email=req.body.email
            let userExist = await UserRegister.findOne({email})
            if(userExist){
                return res.status(400).json({status:false, message:'User already exist'});
            }
            else{
                await UserRegister.create({
                    'name':req.body.name,
                    'email':req.body.email,
                    'password':hashedPassword
                })
                return res.status(200).json({status:true, message:'User is created'});
            }
        }
        catch(err){
            return res.status(400).json({status:false, message:"Failed to create user"});
        }
    }
});

// $$$$$$$$$$$$$$$$$$$$
// Login user router
// $$$$$$$$$$$$$$$$$$$$
userRouter.post('/login-user',[
    body('email').isEmail(),
    body('password').isLength({min:5})
],async(req,res)=>{
    let error = validationResult(req)
    if(error.isEmpty()){
    let email=req.body.email
    let userExist = await UserRegister.findOne({email})
    if(!userExist){
        return res.status(400).json({status:false, message:"user don't exist, signup"})
    }else{
        let passwordCompare= await bcrypt.compare(req.body.password, userExist.password)
        if(passwordCompare){
            let jwtsign = process.env.JWTSECRET
            const data={ id:userExist._id.valueOf()}
            const jwtToken = jwt.sign(data, jwtsign)  
            return res.status(200).json({status:true, message:"User Found", jwttoken:jwtToken, userId:userExist._id.valueOf()});
        }
        else{
            return res.status(400).json({status:false,message:"Try with correct credentials"});
        }
    }
}
else{
    console.log('err,: ', error)
    if(error.errors[0].path=='email'){
        return res.status(400).json({status:false,message:'Must be valid email id'})
    }else{
        return res.status(400).json({status:false,message:"password is incorrect"})
    }
}
});


// $$$$$$$$$$$$$$$
// Admin - pending doctor list
// $$$$$$$$$$$$$$$
userRouter.post('/doctor-pendinglist', async(req, res)=>{
    let admin=req.body.adminid
    try{
        let adminExist = await UserRegister.findById(admin)
        if(adminExist){
            return res.status(200).json({status:true, message:'Found Docotor Pending List', doctorlist:adminExist.isNotification})
        }
        else{
            return res.status(400).json({status:false, message:'Admin details not found'})
        }
    }
    catch(error){
        console.log("error occured while geting admin details: ", error)
        return res.status(400).json({status:false, message:'Error at admin details'})
    }
})


// $$$$$$$$$$$$$$
// Admin - approved doctor list
// $$$$$$$$$$$$$$
userRouter.post('/doctor-approvedlist', async(req, res)=>{
    let admin=req.body.adminid
    try{
        let adminExist = await UserRegister.findById(admin)
        if(adminExist){
            return res.status(200).json({status:true, message:'Found Docotor Approved List', doctorlist:adminExist.seenNotification})
        }
        else{
            return res.status(400).json({status:false, message:'Admin details not found'})
        }
    }
    catch(error){
        console.log("error occured while geting admin details: ", error)
        return res.status(400).json({status:false, message:'Error at admin details'})
    }
});

export default userRouter;


