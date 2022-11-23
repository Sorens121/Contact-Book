import User from "../models/users.js";
import CryptoJs from 'crypto-js';
import jwt from 'jsonwebtoken';

//LOGIN
export const handleLogin = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    //missing username or password
    if(!username || !password) return res.status(400).json({'message': 'username and password is required'});

    //check for user
    const foundUser = await User.findOne({username: username}).exec();

    //no user found by the username
    if(!foundUser) {
        return res.status(401).json({'message': 'user not found'});
    }

    //evaluate password if user is found
    const matchPassword = CryptoJs.AES.decrypt(foundUser.password, process.env.SECRET_KEY);
    const originalPassword = matchPassword.toString(CryptoJs.enc.Utf8);
    //console.log(matchPassword);

    if(originalPassword !== password){
        return res.status(401).json({'message': 'Please check username and password'});
        
    } else {
        //const roles = Object.values(foundUser.roles);
        // const UserInfo =  {
        //     "id": foundUser._id,
        //     "username": foundUser.username,
        //     "roles": roles
        // };
        
        // create jwt tokens
        const accessToken = jwt.sign(
            { id: foundUser._id },
            process.env.ACCESS_TOKEN_SECRET_KEY,
            {expiresIn: '1h'}
        );

        foundUser.accessToken = accessToken;
        const result = await foundUser.save();

        //generate refresh tokens
        // const refreshToken = jwt.sign(
        //     {id: foundUser._id},
        //     process.env.REFRESH_TOKEN_SECRET_KEY,
        //     {expiresIn: '5m'}
        // );

        // //save refresh token to corresponding founduser
        // foundUser.refreshToken = refreshToken;
        // const result = await foundUser.save();

        //login response
        //console.log(result);

        //create httpOnly cookie with refresh token
        //res.cookie('jwt', accessToken, { httpOnly: false, secure: false, sameSite: 'None', maxAge: 24*60*60*1000 });
        res.status(200).json({
            user: {
                username: foundUser.username,
                id: foundUser._id
            }, 
            accessToken});
    }
}

