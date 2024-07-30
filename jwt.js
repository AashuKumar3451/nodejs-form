const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtMiddleware = function(req,res,next){
    const authHeader = req.headers.authorization;
    if(!authHeader){return res.status(401).json("Invalid Token");}
    const token = authHeader.split(' ')[1];
    if(!token){res.status(401).json("Unauthorized");}
    try {
        const decoded = jwt.verify(token,process.env.secret_Key);
        req.userPayload = decoded;
        next();
    } catch (error) {
        console.log("Error");
        res.status(401).json({error: 'Invalid token'});
    }
}

const generateJWT = function(userData){
    return jwt.sign(userData,process.env.secret_Key);
}

module.exports = {jwtMiddleware,generateJWT};