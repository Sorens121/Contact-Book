import User from "../models/users.js";

export const handleLogout = async (req, res) => {
    //On client side, also delete the cookies
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204);// No content

    const accessToken = cookies.jwt;

    // check for refresh token in db
    const foundUser = await User.findOne({accessToken}).exec();
    if(foundUser.accessToken !== accessToken) {
        res.clearCookie('jwt', {httpOnly: false, sameSite: 'None', secure: false});
        return res.sendStatus(204);
    }

    //Delete cookie from db if user is found
    foundUser.accessToken = '';
    const result = await foundUser.save();

    res.clearCookie('jwt', { httpOnly: false, sameSite: 'None', secure: false});
    res.sendStatus(204);
}