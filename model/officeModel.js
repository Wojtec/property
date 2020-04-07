//import mongoose 
const mongoose = require('mongoose');
//import geocoder from libs
const geocoder = require('../libs/geocoder');


//setup office model
let officeSchema = mongoose.Schema({
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    postCode: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    location:{
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates:{
            type: [Number],
            index: '2dsphere'
        }
    },
    building_use: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    buyRent:{
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})


//geocoder create location
officeSchema.pre('save', async function(next){
    let loc = await geocoder.geocode({
        address: this.street,
        country: this.country,
        city: this.city
    });
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude,loc[0].latitude],
    }
    console.log(next);
    next();
    
})


//Export office model
let Office = module.exports = mongoose.model('office',officeSchema);
module.exports.get = (callback, limit)=>{
    Office.find(callback).limit(limit);
}