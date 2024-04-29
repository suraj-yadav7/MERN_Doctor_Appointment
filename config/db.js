import mongoose from "mongoose";
import dotenv from'dotenv';

// configuring dotenv file to access mongodb uri
dotenv.config()
const uri=process.env.MONGO_URI

// Handle mongodb connection, used in server.js 
const connectDB=async()=>{
    try{
        let connectionInstance=await mongoose.connect(uri,{
            dbName:'doctorappoint'
            })
            console.log(`MongoDb connected:  ${connectionInstance.connection.host}`.bgGreen.white)
        }
    catch(error){
        console.log(`error while connecting mongodb:  ${error}`.bgRed.white)
        }
}

export default connectDB;

