import mongoose from "mongoose";

const Contacts = new mongoose.Schema({
    countrycode: {type: String, required: true, maxlength: 100, minlength: 1},
    firstname: {type: String, required: true},
    lastname: {type: String, default: ""},
    phonenumber: {type: String, required: true, maxlength:100, minlength: 1},
    email: {type: String, required: false, unique: false},
    profilePic: {type: String, default: ""},
    isFavorite: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now },
    updatedAt: {type: Date, default: Date.now}
},{timestamps: true});

//const Contacts = mongoose.model("Contacts", ContactSchema);

export default Contacts;
