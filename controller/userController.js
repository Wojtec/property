const UserModel = require('../model/userModel');
const HomeModel = require('../model/homeModel');
const OfficeModel = require('../model/officeModel');
const ImageModel = require('../model/imageModel');

const cloudinary = require('cloudinary');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const bcrypt = require('bcryptjs');

cloudinary.config({ 
    cloud_name: 'hbtc6lmer', 
    api_key: '134144429453754', 
    api_secret: 'bn0eInar9pPdn5kNPd7IN0YfFh8' 
  });



module.exports = {

//Login user
login: (req,res)=>{
UserModel.findOne({email: req.body.email},(err,user)=>{
    if(err){
        return res.status(500).send("Error on the server");
    }
    if(!user){
        return res.status(404).send("No user found");
    }
    let passwordValidation = bcrypt.compare(req.body.password, user.password);
    if(!passwordValidation){
        return res.status(401).json({
            auth: false,
            token: null
        })
    }
    let token = jwt.sign({id: user._id}, config.secret,{
        expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).header("Access-Control-Allow-Origin", "*").json({
        auth: true,
        token: token
    })
})
},

//me test 
meTest:(req,res)=>{
let token =  req.headers['x-access-token'];
    if(!token){
        return res.status(401).json({
            auth: false,
            message: 'No token provided.'
        });
    }
    jwt.verify(token, config.secret, (err,decoded)=>{
        if(err){
            return res.status(500).json({
                auth: false, 
                message: 'Failed to authenticate token.'
            })
        }

    UserModel.findById(decoded.id,{password: 0},(err,user)=>{
            if(err){
                res.status(500).send("There was a problem finding the user.");
            }
            if(!user){
                res.status(404).send("No user found.");
            }
            res.status(200).header("Access-Control-Allow-Origin", "*").json({
                message: "User found",
                data: user
            });
         })
    })
},

//Register new users
new:(req,res)=>{
let hashPassword = bcrypt.hashSync(req.body.password);
let user = new UserModel();
user.name = req.body.name,
user.email = req.body.email,
user.password = hashPassword

//save new user
user.save(user)

//create token
.then((user)=>{
    let token = jwt.sign({id: user._id}, config.secret,{
        expiresIn:86400 // expires in 24 hours
    });
    res.status(200).header("Access-Control-Allow-Origin", "*").json({
        auth:true,
        token:token,
        message: 'New user created'
    });

})
.catch(function(err){
    res.json(err);
})


},
//get users list
getUserList:(req,res)=>{
    UserModel.get((err,user)=>{
        if(err){
            res.json(err);
        }
        
        res.status(200).header("Access-Control-Allow-Origin", "*").json({
            status: 'Success',
            message: 'Users list',
            data: user
        });
    });
},
// get user by ID
getOneUser: (req,res)=>{
    UserModel.findById(req.params.id,(err,user)=>{
        if(err){
            res.json(err);
        }
        res.status(200).header("Access-Control-Allow-Origin", "*").json({
            message: 'User loading',
            data: user
        })
    })
},

//HOUSE
// add new house by user id
userCollectionHouse:async (req,res)=>{
    const house = new HomeModel();
    house.building.floor = req.body.floor;
    house.building.lift = req.body.lift;
    house.building.guard = req.body.guard;
    house.basicFeatures.m2 = req.body.m2;
    house.basicFeatures.type = req.body.type;
    house.basicFeatures.bedrooms = req.body.bedrooms;
    house.basicFeatures.bathrooms = req.body.bathrooms;
    house.basicFeatures.equipment = req.body.equipment;
    house.basicFeatures.condition = req.body.condition;
    house.basicFeatures.balcony = req.body.balcony;
    house.basicFeatures.heating = req.body.heating;
    house.address.street = req.body.street;
    house.address.city = req.body.city;
    house.address.postCode = req.body.postCode;
    house.address.country = req.body.country;
    house.description = req.body.description;
    house.price = req.body.price;
    house.buyRent = req.body.buyRent;
// save new house
await HomeModel.create(house)
// update user home after save
.then(async (dbHome)=>{
  await  UserModel.findByIdAndUpdate(
     {_id: req.userId},
     {$push: {home: dbHome._id}},
     {new: true});
       
   await HomeModel.findByIdAndUpdate(
     {_id: dbHome._id},
     {$push: {userId: req.userId}},
     {new: true});
   await  res.status(200).header("Access-Control-Allow-Origin", "*").json({
     message: 'New house add. Success!',
     data: dbHome,
    })
})
.catch((err)=>{
    res.json(err);
})
},
// Delete house by id
delete: async (req,res)=>{
    try{
        await HomeModel.deleteOne(
           {_id:req.params.home_id});
        await UserModel.findByIdAndUpdate(
           {_id: req.userId},
           {$pull:{ home : req.params.home_id }},
           {new: false});
        await  res.status(200).header("Access-Control-Allow-Origin", "*").json({
            message: 'House delete. Success!',
           })
    }catch(error){
        res.status(500).send(error);
    }
 },
//Image
//add new image by house id 
addImageHouse: (req, res)=>{
    try {
        cloudinary.uploader.upload(req.file.path, async (result)=>{
               await HomeModel.findByIdAndUpdate(
                    {_id: req.params.home_id},
                    {$push: {image: result.url}},
                    {new: true}
                 ).then(async (homeModel)=>{
                   await res.status(200).header("Access-Control-Allow-Origin", "*").json({
                        message: 'Update image success',
                        data: homeModel
                    })
                })
             })
    }catch(error){
        res.status(500).send(error);
    }
},
//OFFICE
//add new office by user id
userCollectionOffice:(req,res)=>{
//save new office
OfficeModel.create(req.body)
// update new office in user
.then((dbOffice)=>{
    return UserModel.findByIdAndUpdate(
        {_id: req.userId},
        {$push: {office: dbOffice._id}},
        {new: true}
    );
})
//display user with id after update office
.then((userModel)=>{
    res.status(200).header("Access-Control-Allow-Origin", "*").json({
        message: 'Update office success',
        data: userModel
    })
})
.catch((err)=>{
    res.json(err);
})
},
//add new image by office id 
addImageOffice: (req, res)=>{
    let img = new ImageModel();
    img.image.data = fs.readFileSync(req.file.path);
    img.image.contentType = req.file.mimetype;
    ImageModel.create(img)
    .then((dbImage)=>{
        return OfficeModel.findByIdAndUpdate(
            {_id: req.params.office_id},
            {$push: {image: dbImage._id}},
            {new: true}
        );
    })
    .then((officeModel)=>{
        res.status(200).header("Access-Control-Allow-Origin", "*").json({
            message: 'Update image success',
            data: officeModel
        })
    })
    .catch((err)=>{
        res.json(err);
    })
},
}