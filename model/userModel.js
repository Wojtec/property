//import mongoose
const mongoose = require('mongoose');

//setup user model
let userSchema = mongoose.Schema({

    name: {
        type: String,
        unique: true,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    home:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'home'
    },
    office:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'office'
    }

})
//Export user model
let User = module.exports = mongoose.model('user', userSchema);
module.exports.get = (callback, limit)=>{
    User.find(callback).limit(limit);
}