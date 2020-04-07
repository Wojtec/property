const mongoose = require('mongoose');
 
// setup location schema 
const locationSchema = new mongoose.Schema({


    location:{
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates:{
            type: [Number],
            index: '2dsphere'
        },
    }
});

    let Location  = mongoose.model('location', locationSchema);

    module.exports.get = (callback, limit)=>{
        Location.find(callback).limit(limit);
    }


module.exports = Location;
