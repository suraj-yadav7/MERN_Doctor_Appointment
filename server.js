import express from "express"
import mongoose from "mongoose"
import morgan from "morgan"
import dotenv from "dotenv"
import colors from "colors"

const app = express()

dotenv.config()
const port = process.env.PORT || 8080

app.listen(port, function(){
    console.log(`Server is running in ${process.env.NODE_MODE} at localhost: ${port}`.bgCyan.white)
})

app.get("/", (req,res)=>{
    res.send("<h1>A Doctor Appointment Application build using MERN Stack 3<h/1>")
})

app.use(express.json())

app.use(morgan('dev'));