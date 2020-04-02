const mongoose = require('mongoose');

//setup schema
let homeSchema = mongoose.Schema({

    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },   
    price: {
        type: Number,
        required: true
    },    
    description: {
        type: String,
        required: true
    },    
    type: {
        type: String,
        required: true
    },    
    bedrooms: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    equipment: {
        type: String,
        required: true
    },
    condition: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now('d-m-yy')
    }
});

//Export home model
let Home = module.exports = mongoose.model('home', homeSchema);

module.exports.get = (callback, limit)=>{
    Home.find(callback).limit(limit);
}