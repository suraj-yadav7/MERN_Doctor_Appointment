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
    gender:{
        type:String,
        required:[true,'Gender is Required']
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isdoctor:{
        type:Boolean,
        default:false
    },
    isNotification:{
        type:Array,
        default:[]
    },
    seenNotification:{
        type:Array,
        default:[]
    },
    appointmentBooked:{
        type:Array,
        default:[]
    }
});

export const UserRegister=mongoose.model('userRegisterData',userSchema);