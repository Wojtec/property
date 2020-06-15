const UserModel = require('../model/userModel');
const HomeModel = require('../model/homeModel');
const OfficeModel = require('../model/officeModel');

const cloudinary = require('cloudinary');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const bcrypt = require('bcryptjs');
const officeModel = require('../model/officeModel');

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
  });



module.exports = {

//Login user
login: async (req,res)=>{
 await UserModel.findOne({email: req.body.email},(err,user)=>{
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
meTest:async (req,res)=>{
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
new: async (req,res)=>{
let hashPassword = bcrypt.hashSync(req.body.password);
let user = new UserModel();
user.name = req.body.name,
user.email = req.body.email,
user.password = hashPassword

//save new user
await user.save(user)

//create token
.then(async(user)=>{
    let token = jwt.sign({id: user._id}, config.secret,{
        expiresIn:86400 // expires in 24 hours
    });
    res.status(200).header("Access-Control-Allow-Origin", "*").json({
        auth:true,
        token:token,
        message: 'New user created'
    });

}).catch((err)=>{
        res.json(err);
    })
},

//get users list
getUserList: async (req,res)=>{
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
getOneUser: async (req,res)=>{
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
deleteHouse: async (req,res)=>{
    try{
        await HomeModel.deleteOne(
           {_id:req.params.home_id});
        await UserModel.findByIdAndUpdate(
           {_id: req.userId},
           {$pull:{ home : req.params.home_id }});
           res.status(200).header("Access-Control-Allow-Origin", "*").json({
            message: 'House delete. Success!',
           })
    }catch(error){
        res.status(500).send(error);
    }
 },
//Image
//add new image by house id 
addImageHouse:async (req, res)=>{
    try {
        await cloudinary.uploader.upload(req.file.path, async (result)=>{
                await HomeModel.findByIdAndUpdate(
                    {_id: req.params.home_id},
                    {$push: {image: result.url}},
                    {new: true}
                 ).then(async (homeModel)=>{
                    res.status(200).header("Access-Control-Allow-Origin", "*").json({
                        message: 'Update image success',
                        data: homeModel
                    })
                }).catch((err) =>{
                    res.status(500).send(err);

                });
             })
    }catch(error){
        res.status(500).send(error);
    }
},

//OFFICE
//add new office by user id
userCollectionOffice: async (req,res)=>{
    const office = new OfficeModel();
    office.address.street = req.body.street;
    office.address.city = req.body.city;
    office.address.postCode = req.body.postCode;
    office.address.country = req.body.country;
    office.basicFeatures.building_use = req.body.building_use;
    office.basicFeatures.m2 = req.body.m2;
    office.basicFeatures.bathrooms = req.body.bathrooms;
    office.basicFeatures.layout = req.body.layout;
    office.basicFeatures.heating = req.body.heating;
    office.building.floor = req.body.floor;
    office.building.lift = req.body.lift;
    office.building.guard = req.body.guard;
    office.description = req.body.description;
    office.price = req.body.price;
    office.buyRent = req.body.buyRent;

//save new office
await OfficeModel.create(office)
// update new office in user
.then(async (dbOffice)=>{
    await UserModel.findByIdAndUpdate(
        {_id: req.user_id},
        {$push: {office: dbOffice._id}},
        {new: true});
    await OfficeModel.findByIdAndUpdate(
        {_id: dbOffice._id},
        {$push: {userId: req.user_id}},
        {new: true});
    await  res.status(200).header("Access-Control-Allow-Origin", "*").json({
        message: 'New house add. Success!',
        data: dbOffice,
        })
}).catch((err)=>{
    res.json(err);
})
},

// Delete office by id
deleteOffice: async (req,res)=>{
    try{
        await officeModel.deleteOne(
           {_id:req.params.office_id});
        await UserModel.findByIdAndUpdate(
           {_id: req.userId},
           {$pull:{ office : req.params.office_id }});
        await  res.status(200).header("Access-Control-Allow-Origin", "*").json({
            message: 'Office delete. Success!',
           })
    }catch(error){
        res.status(500).send(error);
    }
 },


//add new image by office id 
addImageOffice:async (req, res)=>{
    try {
       await cloudinary.uploader.upload(req.file.path, async (result)=>{
               await officeModel.findByIdAndUpdate(
                    {_id: req.params.office_id},
                    {$push: {image: result.url}},
                    {new: true}
                 ).then(async(officeModel)=>{
                    res.status(200).header("Access-Control-Allow-Origin", "*").json({
                        message: 'Update image success',
                        data: officeModel
                    })
                })
             })
    }catch(error){
        res.status(500).send(error);
    }
 
},
}