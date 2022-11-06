import User from '../models/users.js';
import CryptoJS from 'crypto-js';

//REGISTER
export const handleNewUser = async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
        profilepic: req.body.profilepic,
        roles:{
            User: 2001
        }
    });

    //check for duplicate username
    const duplicateUsername = await User.findOne({username: newUser.username}).exec();
    const duplicateEmail = await User.findOne({email: newUser.email}).exec();

    if(duplicateUsername) {
        //return res.sendStatus(409);
        return res.status(409).json({'usernameerror': 'username taken'});
    } else if(duplicateEmail){
        //return res.sendStatus(500)
        return res.status(409).json({'emailerror': 'email already registered'});
    } else {
        await newUser.save();
        return res.status(201).json(`success: ${newUser.username} created!`);
    }
}