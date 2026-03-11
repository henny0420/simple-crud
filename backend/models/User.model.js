const { required } = require('joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    password : {
        type : String,
        required : true,
        trim : true,
    },
    role : {
        type : String,
        enum : ['admin','user'],
        default : 'user'
    }
}, {timestamps : true})

const User = mongoose.model('users',userSchema)
module.exports = User