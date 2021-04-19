
const mongoose = require('mongoose');

const EmailSchema = mongoose.Schema({
    sender: String, 
    address: String,
    subject: String,
    text: String
});
module.exports = mongoose.model('Email', EmailSchema);
