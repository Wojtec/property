//import mongoose
const mongoose = require('mongoose');
//setup image model
let imageSchema = mongoose.Schema({

    image: {
        data: Buffer,
        contentType: String
    }
    
      
    
},{timestamps: true})
//Export image model
let Image = module.exports = mongoose.model('image', imageSchema);
module.exports.get = (callback, limit)=>{
    Image.find(callback).limit(limit);
}