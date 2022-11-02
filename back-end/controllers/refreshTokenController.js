import jwt from 'jsonwebtoken';
import User from '../models/users.js';
import dotenv from 'dotenv';

dotenv.config();

export const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.status(401).json({'message': 'not valid cookie'});

    const refreshToken = cookies.jwt;

    //find User
    const foundUser = await User.findOne({refreshToken: refreshToken}).exec();
    if(!foundUser) return res.status(403).json({'message': 'user not found'});

    //evalute jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET_KEY,
        (error, decoded) => {
            if(error || foundUser.id !== decoded.id){
                return res.status(403).json({'message': 'token not valid'});
            }

            const roles = Object.values(foundUser.roles);
            
            //create new accesstoken
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": decoded.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET_KEY,
                {expiresIn: '15s'}
            );

            return res.json({ accessToken });
        }
    );
}