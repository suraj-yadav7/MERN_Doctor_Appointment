import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is Required']
    },
    email:{
        type:String,
        required:[true,'Email is Must']
    },
    password:{
        type:String,
        required:[true,'Password length 8']
    }
})

export const UserRegister=mongoose.model('userRegisterData',userSchema);