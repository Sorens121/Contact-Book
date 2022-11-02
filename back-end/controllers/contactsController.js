import User from '../models/users.js';
import Contacts from '../models/contacts.js';
import mongoose from 'mongoose';

//convert schema to model
const NewContact = mongoose.model("NewContact", Contacts);

export const handleAddToContacts = async (req, res) => {
    const id = req.params.id; //userID from mongoDb
    const newContact = new NewContact({
        countrycode: req.body.countrycode,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phonenumber: req.body.phonenumber,
        email: req.body.email,
        profilePic: req.body.profilePic,
        isFavorite: req.body.isFavorite,
    });

    try {
        const foundUser = await User.findById({_id: id}).exec();
        
        if(!foundUser) {
            res.status(400).json({"message": "not found"});
        } else{
            const result = await User.findByIdAndUpdate(
                {_id: id},
                {$push: {contactlist: newContact}}
            );
            return res.status(201).json(result);
            
        }
        
    } catch (error) {
        return res.status(403).json({"message": "user not found"});
    }
}

export const handleUpdateContact = async (req, res) => {
    const userId = req.params.user_id;
    const contactId = req.params.contact_id;
    const updateContact = req.body;
    // console.log(`userId: ${userId} contactId: ${contactId}`);
    // console.log("update: ", updateContact)
    const options = {
        new: true,
        arrayFilters: [{'c._id': contactId}]
    };

    try {
        //first find the user
        const foundUser = await User.findById({_id: userId}).exec();
        if(!foundUser){
            return res.status(403).json({"message": 'user not found'});
        } else {
            const result = await User.findOneAndUpdate({_id: userId},
                {
                    $set: {
                    'contactlist.$[c].countrycode': updateContact.countrycode,
                    'contactlist.$[c].firstname': updateContact.firstname,
                    "contactlist.$[c].lastname": updateContact.lastname,
                    "contactlist.$[c].phonenumber": updateContact.phonenumber,
                    "contactlist.$[c].email": updateContact.email,
                    "contactlist.$[c].profilePic": updateContact.profilePic,  
                    "contactlist.$[c].isFavorite": updateContact.isFavorite
                    }
                },
                options
            );
            return res.status(201).json(result.contactlist);
        }
    } catch (error) {
        return res.status(403).json({"message": "contact not found"});
    }
}

export const handleDeleteContact = async (req, res) => {
    const userId = req.params.user_id;
    const contactId = req.params.contact_id;

    try {
        const foundUser = await User.findById({_id: userId}).exec();
        
        if(!foundUser){
            return res.status(403).json({'message': 'user not found'});
        } else {
            const result = await User.updateOne(
                {_id: userId},
                {$pull: {contactlist: {_id: contactId}}}
            ).exec();

            return res.status(204).json(result);
        }

    } catch (error) {
        return res.status(400).json({'message': 'invalid'});
    }
}