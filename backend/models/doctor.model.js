import mongoose from 'mongoose'

const doctorSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:[true,'FullName required']
    },
    email:{
        type:String,
        required:[true,'Email required']
    },
    password:{
        type:String,
        required:[true,'Password required']
    },
    gender:{
        type:String,
        required:[true, 'Gender Required']
    },
    qualification:{
        type:String,
        required:[true,'Qualification required']
    },
    specialization:{
        type:String,
        required:[true,'Specialization required']
    },
    experience:{
        type:Number,
        required:[true,'Experience required']
    },
    fees:{
        type:Number,
        required:[true, 'Consultation Fees required']
    },
    isDoctor:{
        type:Boolean,
        default:true
    }
    ,
    approveStatus:{
        type:String,
        default:'Pending'
    },
    appoinmentsPending:{
        type:Array,
        default:[]
    },
    appointmentsHistory:{
        type:Array,
        default:[]
    }
});

export  const DoctorRegistration = mongoose.model('doctorregister',doctorSchema);