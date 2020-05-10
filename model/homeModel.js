const mongoose = require('mongoose');
const geocoder = require('../libs/geocoder');


//setup home schema
let homeSchema = mongoose.Schema({
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    postCode: {
        type: String,
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
    image: {
        type: Array,
        contentType: String
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
    buyRent:{
        type: Boolean,
        required: true

    },
    date: {
        type: Date,
        default: Date.now
    }
});

//geocoder create location
homeSchema.pre('save', async function(next){
    let loc = await geocoder.geocode({
        address: this.street,
        country: this.country,
        city: this.city
    });
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude,loc[0].latitude],
    }
    next();
})

//Export home model
let Home = module.exports = mongoose.model('home', homeSchema);
module.exports.get = (callback, limit)=>{
    Home.find(callback).limit(limit);
}
