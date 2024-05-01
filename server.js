import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js"
import userRouter from './controllers/userRouter.js'
import authorizationUser from './middlewares/authorizationUser.js'
import cors from "cors"
import userDataRouter from './controllers/userDataRouter.js'
import doctorRouter from './controllers/doctorRouter.js'
import colors from 'colors'
import AppAccApproval from "./controllers/AppAccApproval.js";

const app = express()

dotenv.config()
const port = process.env.PORT || 8080
const mongoURI = process.env.MONGO_URI
// Connection mongodb
connectDB();

app.listen(port, function(){
    console.log(`Server is running in ${process.env.NODE_MODE} at localhost: ${port}`.bgCyan.white)
})

app.get("/", (req,res)=>{
    res.send("<h1>A Doctor Appointment Application build using MERN Stack 4<h/1>")
})

app.use(express.json())

app.use(morgan('dev'));

const corsOption={
    origin:'http://localhost:5173',
    methods:['GET',"POST"],
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(corsOption))

// api for registration and login
app.use('/api', userRouter);

// api for doctor registration and login
app.use('/api', doctorRouter)

app.use('/api', AppAccApproval)


// api for authorization of user and getting user data
app.use('/api', authorizationUser, userDataRouter)

