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
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isDoctor:{
        type:Boolean,
        default:false
    },
    isNotification:{
        type:Array,
        default:[]
    },
    seenNotification:{
        type:Array,
        deafult:[]
    }
});

export const UserRegister=mongoose.model('userRegisterData',userSchema);