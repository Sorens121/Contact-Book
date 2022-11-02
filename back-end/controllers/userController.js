import User from '../models/users.js';

export const handleAllContacts = async (req, res) => {
    const id = req.params.id;

    try {
        const foundUser = await User.findById({_id: id}).exec();
        if(!foundUser){
            return res.status(403).json({'message': 'user not found'});
        } else {
            const data ={
                contactlist: foundUser.contactlist,
                //id: foundUser._id,
                // username: foundUser.username,
                // firstname: foundUser.firstname,
                // lastname: foundUser.lastname,
                // profilepic: foundUser.profilepic,
                // email: foundUser.email,
            }
            return res.status(200).json(data);
        }
    } catch (error) {
        return res.status(400).json({'message': 'invalid'});
    }
}