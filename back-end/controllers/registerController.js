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
    const duplicate = await User.findOne({username: newUser.username}).exec();
    if(duplicate) {
        //return res.status(409).json({'message': 'username taken'});
        return res.sendStatus(409);
    }

    try {
        await newUser.save();
        res.status(201).json(`success: ${newUser.username} created!`);
    } catch (error) {
        //res.status(500).json({'message': 'email already registered'});
        res.sendStatus(500);
    }
}