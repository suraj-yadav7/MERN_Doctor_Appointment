import express from 'express'
import bcrypt from 'bcryptjs'
import { body, validationResult } from 'express-validator';
import { DoctorRegistration } from '../models/doctor.model/doctor.model.js';
import jwt from 'jsonwebtoken';

doctorRouter=express.Router();

doctorRouter.Post('/doctor-register',[
body('fullname').isLength({min:4}),
body('password').isLength({min:5}),
body('email').isEmail(),
body('gender').exists(),
body('qualification').exists(),
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
                let createDoctor = await DoctorRegistration.create({
                    fullname:req.body.fullname,
                    password:hashedPassword,
                    email:req.body.email,
                    gender:req.body.gender,
                    qualification:req.body.qualification,
                    specialization:req.body.specialization,
                    experience:req.body.experience,
                    fees:req.body.fees
                })
                return res.status(true).json({status:true, message:"User is Created"})
            }
            else{
                return res.status(400).json({status:false,message:"User Already Exist"})
            }
        }
        catch(error){
            console.log("Error at doctor registration: ", error)
            return res.status(400).json({status:false, message:'Error occures doctor registration'})
        }
    }
    else{
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
            return res.status(400).json({status:false,message:'Atleast fees must be 200'})
        }
    }   
});



//$$$$$$$$$$$$$$$$$
// Doctor - login
//$$$$$$$$$$$$$$$$$
doctorRouter.post('/doctor-login', async(req,res)=>{
    let email = req.body.email
    let doctorExist = await DoctorRegistration.findOne({email})
    if(doctorExist){
        let comparePw= await bcrypt.compare(doctorExist.password, req.body.password)
        if(comparePw){
            let jwtsign = process.env.JWTSECRET
            const userid=doctorExist._Id.valueOf()
            let jwttoken = jwt.sign(userid, jwtsign)
            return res.status(200).json({status:true,message:'User Found', jwttkoen:jwttoken, userId:userid})
        }
        else{
            return res.status(400).json({status:false, message:'Password is Incorrect'})
        }
    }
    else{
        return res.status(400).json({status:false, message:"User don't exist, Register"})
    }
});
