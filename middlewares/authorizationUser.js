import  jwt from "jsonwebtoken";

const authorizationUser = async(req, res, next)=>{
    try{
        
        let data = req.headers['authorization'].split(' ')[1]
        let userId=req.headers['userid']
        let doctorId=req.headers['doctorid']
        jwt.verify(data, process.env.JWTSECRET, (error, decode)=>{
            if(error){
                return res.status(401).json({status:false, message:'You are NOT Authorized'})
            }
            else{
                // decode.id is id passed during login og user in jwt.sign
                if(doctorId !== 'null'){
                    doctorId=decode.id
                    console.log("runned dr")
                }else{
                    console.log("runned user")
                    userId=decode.id
                }
                next();
            }
        })
    }
    catch(error){
        console.log("error at authorization")
        res.status(400).json({status:false, message:"Error: Authorization failed"})
    }
}

export default authorizationUser;