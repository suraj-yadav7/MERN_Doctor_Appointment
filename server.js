import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import dotenv from "dotenv";
import colors from "colors";
import {UserForm}  from "./models/user.models.js";

const app = express()

dotenv.config()
const port = process.env.PORT || 8080
const mongoURI = process.env.MONGO_URI

app.listen(port, function(){
    console.log(`Server is running in ${process.env.NODE_MODE} at localhost: ${port}`.bgCyan.white)
    connectMongo()
})
// IIF

    async function connectMongo(){
        let connectionInstance = await mongoose.connect(mongoURI)
        console.log("MongoDb Connected :: ", connectionInstance.connection.host);
        try{
            await UserForm.create({
                name:"shiva",
                email:"shiva@gmail.com",
                password:"shiva123"
            })
            console.log("Collection created")
        }
        catch(error){
            console.log("error while creating collection: ", error)
        }
    }




app.get("/", (req,res)=>{
    res.send("<h1>A Doctor Appointment Application build using MERN Stack 4<h/1>")
})

app.use(express.json())

app.use(morgan('dev'));