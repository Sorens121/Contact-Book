import User from "../models/users.js";
import CryptoJs from "crypto-js";


//UPDATE PASSWORD
export const handlePasswordUpdate = async (req, res) => {
    const oldPass = req.body.oldpassword;
    const newPass = req.body.newpassword;
    const id = req.params.id;

    try {
        const foundUser = await User.findById({_id: id}).exec();

        //decrypt original password
        const originalPassword = CryptoJs.AES.decrypt(foundUser.password, process.env.SECRET_KEY);
        const matchPassword = originalPassword.toString(CryptoJs.enc.Utf8);

        //match password
        if(matchPassword !== oldPass){
            return res.status(403).json({'passworderror': 'passwords donot match'});
        } else {
            //save new password
            const newpassword = CryptoJs.AES.encrypt(newPass, process.env.SECRET_KEY).toString();
            //console.log(newpassword);
            const result = await User.updateOne(
                {_id: id},
                {$set: {password: newpassword}}
            ).exec();
            return res.status(201).json({'message': 'password changed successfully'});
        }
    } catch (error) {
        return res.status(403).json({"usererror": 'user not found'});
    }
}
