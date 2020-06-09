//import mongoose
const mongoose = require('mongoose');

//setup user model
let userSchema = mongoose.Schema({

    name: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    home:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Home'
    },
    office:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Office'
    },
    avatar:{
        type: String,
    },
    messages: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Message'
    },
    date: {
        type: Date,
        default: Date.now,
    }

})
//Export user model
let User = module.exports = mongoose.model('user', userSchema);
module.exports.get = (callback, limit)=>{
    User.find(callback).limit(limit);
}