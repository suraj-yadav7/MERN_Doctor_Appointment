import  jwt from "jsonwebtoken";

const authorizationUser = async(req, res, next)=>{
    try{
        console.log('first')
        
        let data = req.headers['authorization'].split(' ')[1]
        let userId=req.headers['userid']
        jwt.verify(data, process.env.JWTSECRET, (error, decode)=>{
            if(error){
                return res.status(401).json({status:false, message:'You are NOT Authorized'})
            }
            else{
                userId=decode.id
                next()
            }
        })

    }
    catch(error){
        console.log("error at authorization")
        res.status(400).json({status:false, message:"Error: Authorization failed"})
    }
}

export default authorizationUser;