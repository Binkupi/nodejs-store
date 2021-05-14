//model user.js
const mongoose=require('mongoose');
const bcrypt=require('bcrypt-nodejs');

//Định nghĩa cấu trúc user model
const Schema =mongoose.Schema;
const user= new Schema({
    email:{type:String, required:true},
    password:{type:String, required:true},

});
module.exports=mongoose.model('User',user);