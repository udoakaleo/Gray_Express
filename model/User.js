const mongoose = require('mongoose');
const { stringify } = require('uuid');
const Schema =  mongoose.Schema;


const userSchema = new Schema({
    username: {
        type: String ,
        required: true 
    },
    roles: {
        type: Number,
        default: 1987
    },
    Editor: Number,
    Admin: Number ,

    password: {
        type: String,
        required: true 
    }, 
    refreshToken: String
})

module.exports = mongoose.model('User', userSchema);