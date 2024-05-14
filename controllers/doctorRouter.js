import express from 'express'
import bcrypt from 'bcryptjs'
import { body, validationResult } from 'express-validator';
import { DoctorRegistration } from '../models/doctor.model.js';
import jwt from 'jsonwebtoken';
import { UserRegister } from '../models/user.models.js';

const doctorRouter=express.Router();

doctorRouter.post('/doctor-register',[
body('fullname').isLength({min:4}),
body('password').isLength({min:5}),
body('email').isEmail(),
body('gender').exists(),
body('qualification').exists().notEmpty(),
body('specialization').exists(),
body('experience').exists().isNumeric(),
body('fees').exists().isNumeric({min:200, max:100})], async(req,res)=>{
    let error = validationResult(req)
    if(error.isEmpty()){
        let salt = await bcrypt.genSalt(10)
        let hashedPassword = await bcrypt.hash(req.body.password, salt)
        try{
            let email = req.body.email
            let doctor = await DoctorRegistration.findOne({email})
            if(!doctor){
                let createDoctor = await DoctorRegistration({
                    fullname:req.body.fullname,
                    password:hashedPassword,
                    email:req.body.email,
                    gender:req.body.gender,
                    qualification:req.body.qualification,
                    specialization:req.body.specialization,
                    experience:req.body.experience,
                    fees:req.body.fees
                })
                await createDoctor.save()
                console.log("docot reg: ", createDoctor)
                let adminExist = await UserRegister.findOne({isAdmin:true})
                console.log("admin exist: ", adminExist)
                if(adminExist && createDoctor){
                    let notification =adminExist.isNotification;
                    let doctorId=createDoctor._id.valueOf()
                    notification.push({type:'doctor',message:`${createDoctor.fullname} has applied for doctor.`,data:{doctorid:doctorId, doctorName:createDoctor.fullname, doctorExp:createDoctor.experience, doctorSpecialization:createDoctor.specialization}});
                    let adminId=adminExist._id.valueOf();
                    await UserRegister.findByIdAndUpdate(adminId,{isNotification:notification});
                    return res.status(200).json({status:true, message:"Doctor profile is created pending at admin for Approval"});
                }
            }
            else{
                return res.status(400).json({status:false,message:"User Already Exist!"})
            }
        }
        catch(error){
            console.log("Error at doctor registration: ", error)
            return res.status(400).json({status:false, message:'Error occures doctor registration'})
        }
    }
    else{
        console.log('error: ', error)
        if(error.errors[0].path=='fullname'){
            return res.status(400).json({status:false,message:'Name must be 4 digit'})
        }
        else if(error.errors[0].path=='password'){
            return res.status(400).json({status:false,message:'Password must be 5 digit'})
        }
        else if(error.errors[0].path=='email'){
            return res.status(400).json({status:false,message:'Must be valid email'})
        }
        else if(error.errors[0].path=='gender'){
            return res.status(400).json({status:false,message:'Must select gender'})
        }
        else if(error.errors[0].path=='qualification'){
            return res.status(400).json({status:false,message:'Need Qualification'})
        }
        else if(error.errors[0].path=='specialization'){
            return res.status(400).json({status:false,message:'Need Specialization'})
        }
        else if(error.errors[0].path=='experience'){
            return res.status(400).json({status:false,message:'Need Experience'})
        }else{
            return res.status(400).json({status:false,message:'Need Fees'})
        }
    }   
});


//$$$$$$$$$$$$$$$$$
// Doctor - login
//$$$$$$$$$$$$$$$$$
doctorRouter.post('/doctor-login',[
    body('email').isEmail(),
    body('password').exists().isLength({min:5}),
], async(req,res)=>{
    let error = validationResult(req)
    if(error.isEmpty()){
    let email = req.body.email
    let doctorExist = await DoctorRegistration.findOne({email})
    console.log("Dr: ", doctorExist)
    if(doctorExist.approveStatus!=='Pending'){
        if(doctorExist){
            let comparePw= await bcrypt.compare(req.body.password,doctorExist.password)
            if(comparePw){
                let jwtsign = process.env.JWTSECRET
                const doctorid=doctorExist._id.valueOf()
                let jwttoken = jwt.sign(doctorid, jwtsign)
                return res.status(200).json({status:true,message:'User Found', jwttoken:jwttoken, doctorId:doctorid})
            }
            else{
                return res.status(400).json({status:false, message:'Password is Incorrect'})
            }
        }
        else{
            return res.status(404).json({status:false, message:"User don't exist, Register"})
            }
    }
    else{
        return res.status(400).json({status:false, message:'Admin Approval Needed'})
    }
    }
else{
     if(error.errors[0].path=='email'){
        return res.status(400).json({status:false, message:'must be valid email id'})
     }   
     else{
        return res.status(400).json({status:false, message:'password is incorrect'})
     }
    }
});


// $$$$$$$$$$$$$$
// Get list of docotor list on user Homepage
//$$$$$$$$$$$$$$$
doctorRouter.get('/get-doctorList',   async(req, res)=>{
    try{
        let doctorList = await DoctorRegistration.find()
        let doctorArr=doctorList.filter((dr)=> dr.approveStatus==='Approved')
        .map((dr)=>{
            return {
                drId:dr._id.valueOf(),
                drName:dr.fullname,
                specialization:dr.specialization,
                fees:dr.fees
            }
        })

        if(doctorList){
            return res.status(200).json({status:true,message:'Doctor List found', drData:doctorArr})
        }
        else{
            return res.status(400).json({status:false,message:'Doctor list not found'})
        }
    }
    catch(error){
        console.log("error at giving doctor list: ", error)
    }

});

export default doctorRouter;