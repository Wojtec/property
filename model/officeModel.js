//import mongoose 
const mongoose = require('mongoose');
//import geocoder from libs
const geocoder = require('../libs/geocoder');


//setup office model
let officeSchema = mongoose.Schema({
    address:{
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
        }

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
    basicFeatures:{
        building_use: {
            type: String,
            required: true
        },
        m2: {
            type: Number,
            required: true
        },
        bathrooms: {
            type: Number,
            required: true
        },
        layout: {
            type: String,
            required: true
        },
        heating: {
            type: Boolean,
            required: true
        }
    },
    building: {
        floor:{
            type: Number,
            required: true
        },
        lift: {
            type: Boolean,
            required: true
        },
        guard: {
            type: Boolean,
            required: true
        }
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
        type: Array,
    },
    buyRent:{
        type: Boolean,
        required: true
    },
    userId: {
        type:[mongoose.Schema.Types.ObjectId],
        ref: 'user'

    },
    date: {
        type: Date,
        default: Date.now
    }
})


//geocoder create location
officeSchema.pre('save', async function(next){
    let loc = await geocoder.geocode({
        address: this.address.street,
        country: this.address.country,
        city: this.address.city
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