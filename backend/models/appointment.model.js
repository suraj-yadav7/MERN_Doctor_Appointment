import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    patientId:{
        type:String,
        required:true
    },
    patientName:{
        type:String,
        required:true
    },
    doctorId:{
        type:String,
        required:true
    },
    doctorName:{
        type:String,
        required:true
    },
    doctorSpecialztn:{
        type:String,
        required:true
    },
    doctorFees:{
        type:Number,
        required:true
    },
    dateofAppnt:{
        type:String,
        required:true
    },
    appointStatus:{
        type:String,
        default:'Pending'
    }
});

export const PatientAppointment = mongoose.model('patientAppointment', appointmentSchema);