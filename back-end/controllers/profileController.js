import User from "../models/users.js";

export const handleGetProfile = async (req, res) => {
    const id = req.params.id;

    try {
        const foundUser = await User.findById({_id: id}).exec();
        if(foundUser){
            const result = {
                username: foundUser.username,
                firstname: foundUser.firstname,
                lastname: foundUser.lastname,
                profilepic: foundUser.profilepic,
                email: foundUser.email,
            }

            return res.status(200).json(result);
        }
    } catch (error) {
        return res.status(400).json({"message": 'User details not found'});
    }
}

export const handleUpdateProfile = async (req, res) => {
    const id = req.params.id;
    const updates = req.body;

    try {
        const foundUser = await User.findById({_id: id}).exec();
        if(foundUser){
            const result = await User.updateOne({_id: id}, 
                {
                    $set:{
                        "username": updates.username,
                        "firstname": updates.firstname,
                        "lastname": updates.lastname,
                        "profilePic": updates.firstname,
                        "email": updates.email,
                    }
                }
            );

            if(result.modifiedCount > 0) {
                const data = await User.find({_id: id}, 
                    {
                        "_id": 1, 
                        "username": 1, 
                        "firstname": 1, 
                        "lastname": 1, 
                        "email": 1, 
                        "profilepic": 1
                    }
                );
                return res.status(200).json(data);
            } else {
                return res.status(400).json({"message": "not updated"})
            }
        }
        
    } catch (error) {
        return res.status(400).json({"message": "user not found"});
    }
}