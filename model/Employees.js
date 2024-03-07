const mongoose = require('mongoose');
const { stringify } = require('uuid');
const Schema =  mongoose.Schema;


const employeeInfoSchema = new Schema({
    firstname : {
        type : String,
        required: true
    },
    lastname: {
        type : String,
        required: true
    }
})

module.exports = mongoose.model('Employeeinfo', employeeInfoSchema)