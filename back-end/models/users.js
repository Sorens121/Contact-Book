import mongoose from "mongoose";
import Contacts from "./contacts.js";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    firstname: {type: String, required: true},
    lastname: {type: String, default: ""},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    profilepic: {type: String, default: ""},
    roles: {
        User: {type: Number, default: 2001},
        Admin: {type: Number}
    },
    accessToken: {type: String},
    contactlist: [Contacts]
    }, {timestamps: true});


const User = mongoose.model("User", userSchema);

export default User;