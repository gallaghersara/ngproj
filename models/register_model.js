const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema
const RegisterSchema = new Schema({
    Name: {type:String, required:true},
    lastName: {type:String, required:true},
    Email: {type:String, required:true},
    Password: {type:String, required:true},
});


mongoose.model('Register', RegisterSchema);