import jwt from "jsonwebtoken"

const ensureAuthentication = (req,res,next) =>{
    const auth = req.headers['authorization'];
    if(!auth){
        return res.status(403).json({success:false, message: 'No token provided'})
    }
    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        console.error(error)
        res.status(403).json({success:false, message: 'unauthorized token'})
    }
}


export default ensureAuthentication;