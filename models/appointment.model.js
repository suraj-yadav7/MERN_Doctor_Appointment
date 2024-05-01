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
    patientMsg:{
        type:String,
        required:[true,'Few Word of problem']
    },
    dateofAppnt:{
        type:String,
        required:[true,'Date is must']
    }

});

export const PatientAppointment = mongoose.model('patientAppointment', appointmentSchema);