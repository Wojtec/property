const OfficeModel = require('../model/officeModel');
module.exports = {
//handle index actions
    index: (req,res)=>{
    OfficeModel.get((err,office)=>{
       if(err){
           res.status(500).json({
               status: "error",
               message: err,
           });   
       }
       res.json({
           status: "succes",
           message: "Office list",
           data: office
       });
   });
},
//handle new office 
   newOffice: (req,res) =>{
   let local =  new OfficeModel();
   local.street = req.body.street,
   local.city = req.body.city,
   local.postCode = req.body.postCode,
   local.country = req.body.country,
   local.building_use =  req.body.building_use,
   local.title = req.body.title,
   local.description = req.body.description,
   local.price = req.body.price,
   local.image = req.body.image,
   local.buyRent = req.body.buyRent,
   local.date = req.body.date
   console.log(local);
//save office in db
local.save((err)=>{
    if(err){
        res.status(500).json(err);
    }
    res.json({
        message: 'New Office add ++',
        data: local
         });
       })
    },
//get office by id
    oneOffice: (req,res)=>{
        OfficeModel.findById(req.params.office_id,(err,office)=>{
            if(err){
                res.status(500).json(err);
            }
            res.json({
                message: 'Office loading...',
                data: office
            })

        })
    },
//delete office by id 
    deleteOffice: (req,res)=>{
        OfficeModel.deleteOne({_id:req.params.office_id},(err)=>{
            if(err)
                res.status(500).send(err);
            
            res.json({
                status:'Success',
                message: 'Office delete'
            })
        })
    },
//Filter by all parameters
    findByParams: (req,res)=>{
        OfficeModel.find({$or: [{
            buyRent: req.params.buyRent,
            city: req.params.city,
            building_use: req.params.building_use,
            price: req.params.price
        }]}, (err,office)=>{
            if(err){
                res.status(500).json(err);
            }
            res.json({
                message: "Offices by parameters loading",
                data: office
            })
        })
    },
//Filter price office From To
    priceFilterOffice: (req,res)=>{
        OfficeModel.find({$and: [{
            buyRent: req.params.buyRent,
            city: req.params.city,
            building_use: req.params.building_use,
            price: req.params.price,
            price: {$gte: req.params.from , $lte: req.params.to},
            price: {$lte: req.params.to, $gte: req.params.from }
        }]},(err,office)=>{
    if(err){
        res.status(500).json(err);
    }
    res.json({
        message: "Offices filter by price",
        data: office
    })

        })

    },
//Filter office by buyRent and city
    filterBuyRentCity: (req,res)=>{
        OfficeModel.find({ $and: [{
            buyRent: req.params.buyRent,
            city: req.params.city
        }]},(err,office)=>{
            if(err){
                res.status(500).json(err)

            }
            res.json({
                message: "Office filter by buyRent and City",
                data: office
                
            })

        })

    },
    findByDate: (req,res)=>{
        const today = new Date();
        const configDate = new Date(today);
        if(req.params.date == 24){
            configDate.setDate(configDate.getDate() - 2);
        }if(req.params.date == 7){
            configDate.setDate(configDate.getDate() - 7);

        }if(req.params.date == 31){
            configDate.setMonth(configDate.getMonth() - 1);
        }

            OfficeModel.find({ 

                date: { $lte: new Date(today), $gte: new Date(configDate)}

            },(err,office)=>{
            if(err){
                res.status(500).json(err);
            }
            res.json({
                message: "offices by date loades",
                data: office
            })
        })

    }
    




}






