const mongoose = require('mongoose');


// setup message model
const messageSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    text:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})
// Export message model
let Message = module.exports = mongoose.model('message', messageSchema);
module.exports.get = (callback, limit)=>{
    Message.find(callback).limit(limit);
}