const UserModel = require('../model/userModel');
const HomeModel = require('../model/homeModel');
const OfficeModel = require('../model/officeModel');
const ImageModel = require('../model/imageModel');

const fs = require('fs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const bcrypt = require('bcryptjs');
module.exports = {
//Login user
login: (req,res)=>{
    console.log(req.body);
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
    res.status(200).json({
        auth: true,
        token: token
    })
})
},
//me test 
meTest:(req,res, next)=>{
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
    res.status(200).json({
        message: "User found",
        data: user
    });
 
})
})

},
//Register add new users
new:(req,res)=>{
let hashPassword = bcrypt.hashSync(req.body.password);
let user = new UserModel();
user.name = req.body.name,
user.email = req.body.email,
user.password = hashPassword
//save new user
user.save((err,user)=>{
    if(err){
        res.json(err);
    }
//create token
    let token = jwt.sign({id: user._id}, config.secret,{
        expiresIn:86400 // expires in 24 hours
    });
    res.json({
        auth:true,
        token:token,
        message: 'New user created'

    });
});
},
//get users list
getUserList:(req,res)=>{
    UserModel.get((err,user)=>{
        if(err){
            res.json(err);
        }
        res.json({
            status: 'Success',
            message: 'Users list',
            data: user
        });
    });
},
// get one user
getOneUser: (req,res)=>{
    console.log(req)
    UserModel.findById(req.params.id,(err,user)=>{
        if(err){
            res.json(err);
        }
        res.json({
            message: 'User lading',
            data: user
        })
    })
},
//HOUSE
// add new house by user id
userCollectionHouse:(req,res)=>{

// save new house
HomeModel.create(req.body)
// update user home after save
.then(function(dbHome){
  return  UserModel.findByIdAndUpdate(
        {_id: req.userId},
        {$push:{home: dbHome._id}},
        {new: true});
})
//display user after update
.then(function(userModel){
    res.json({
        message: 'Update success',
        data: userModel
    })
})
.catch(function(err){
    res.json(err);
})
},
// Delete house by id
delete: (req,res)=>{
    HomeModel.deleteOne({
        _id:req.params.home_id
    },(err)=>{
        if(err)
            res.send(err);
        res.json({
            status:'Success',
            message: 'Home deleted'
        })
    })
 },
//Image
//add new image by office id 
addImageOffice: (req, res)=>{
    console.log(req);
    let img = new ImageModel;
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
        res.json({
            message: 'Update image success',
            data: officeModel
        })
    })
    .catch((err)=>{
        res.json(err);
    })
},
//add new image by house id 
addImageHouse: (req, res)=>{
    console.log(req);
    let img = new ImageModel;
    img.image.data = fs.readFileSync(req.file.path);
    img.image.contentType = req.file.mimetype;
    ImageModel.create(img)
    .then((dbImage)=>{
        return HomeModel.findByIdAndUpdate(
            {_id: req.params.home_id},
            {$push: {image: dbImage._id}},
            {new: true}
        );
    })
    .then((homeModel)=>{
        res.json({
            message: 'Update image success',
            data: homeModel
        })
    })
    .catch((err)=>{
        res.json(err);
    })
},
// get image 
getImage:(req,res)=>{
    ImageModel.findOne({},(err,image)=>{
        if(err){
            res.json(err);
        }
        res.json({
             message: 'image loaded',
             data: image
        })
    })
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
    res.json({
        message: 'Update office success',
        data: userModel
    })
})
.catch((err)=>{
    res.json(err);
})
}
}