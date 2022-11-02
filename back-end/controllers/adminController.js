import User from '../models/users.js';

export const handleAllUsers = async (req, res) => {
    try {
        const result = await User.find({}).select("username firstname lastname");
        if(!result) return res.status(403).json({'message': "no result"});

        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({'message': 'invalid'});
    }
}