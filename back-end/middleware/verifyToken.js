import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization; // for checking in dev server
    //console.log(authHeader);
    if(!authHeader?.startsWith('Bearer ')) return res.status(401).json({"message": "session expired"});

    const token = authHeader.split(" ")[1];

    jwt.verify(
        token, 
        process.env.ACCESS_TOKEN_SECRET_KEY , 
        (error, decoded) => {
            if(error) return res.status(403).json({"message": "Token is not valid"});
            req.user = decoded.username;
            req.roles = decoded.roles;
            next();
        }
    );
}

export default verifyJWT;