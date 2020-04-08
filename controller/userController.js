const UserModel = require('../model/userModel');
const HomeModel = require('../model/homeModel');
const OfficeModel = require('../model/officeModel');
module.exports = {

//add new users
new:(req,res)=>{
let user = new UserModel();
user.name = req.body.name,
user.email = req.body.email,
user.password = req.body.password
//save new user
user.save((err)=>{
    if(err){
        res.json(err);
    }
    res.json({
        message: 'New user created',
        data: user
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
        {_id: req.params.id},
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
//OFFICE
userCollectionOffice:(req,res)=>{
OfficeModel.create(req.body)
.then((dbOffice)=>{
    return UserModel.findByIdAndUpdate(
        {_id: req.params.id},
        {$push: {office: dbOffice._id}},
        {new: true}
    )
})
}
}