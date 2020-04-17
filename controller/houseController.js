const HomeModel = require('../model/homeModel');
module.exports = {

//handle index actions
    index: (req,res)=>{
    HomeModel.get((err,home)=>{
       if(err){
           res.json({
               status: "error",
               message: err,
           });   
       }
       res.json({
           status: "Success",
           message: "Houses list",
           data: home
       });
   });
},
//handle create house
   new: (req,res) => {
   let house = new HomeModel();
   house.street = req.body.street,
   house.city = req.body.city,
   house.postCode = req.body.postCode,
   house.country = req.body.country,
   house.image = new Image(req.body.image),
   house.title = req.body.title,
   house.price = req.body.price,
   house.description = req.body.description,
   house.type = req.body.type,
   house.bedrooms = req.body.bedrooms,
   house.bathrooms = req.body.bathrooms,
   house.equipment = req.body.equipment,
   house.condition = req.body.condition,
   house.date = req.body.date,
   house.buyRent = req.body.buyRent 
   // save a new house
   house.save((err) =>{
       if(err){
           res.json(err);
       }
       res.json({
           message:'New House add +++',
           data: house
       });
   })
},
// select one house
   one: (req,res)=>{
   HomeModel.findById(req.params.home_id, (err,home)=>{
       if(err){
           res.json(err);
       }
       res.json({
           message: "Home loading",
           data: home

       })
       
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
//Filter office by buyRent and city
filterBuyRentCity: (req,res)=>{
    HomeModel.find({ $and: [{
        buyRent: req.params.buyRent,
        city: req.params.city
    }]},(err,home)=>{
        if(err){
            res.status(500).json(err)

        }
        res.json({
            message: "Homes filter by buyRent and City",
            data: home
            
        })

    })

},
// Filter by all parameters
   allParameters: (req,res)=>{
    const today = new Date();
    const configDate = new Date(today);
    if(req.params.date == 24){
        configDate.setDate(configDate.getDate() - 1);
    }if(req.params.date == 7){
        configDate.setDate(configDate.getDate() - 7);
    }if(req.params.date == 31){
        configDate.setMonth(configDate.getMonth() - 1);
    }
       HomeModel.find({$or: [{
       price: {$gte: req.params.from, $lte: req.params.to },
       type: req.params.type,
       bedrooms: req.params.beds,
       bathrooms: req.params.baths,
       equipment: req.params.equipment,
       condition: req.params.condition,
       date: { $lte: new Date(today), $gte: new Date(configDate)}
       }]},
       (err,home)=>{
       if(err){
           res.json(err);
       }
       res.json({
           message:"Homes by parameters loading",
           data:home
       })
   })
},
// Date filter from to 
findByDate: (req,res)=>{
       
    const today = new Date();
    const configDate = new Date(today);
    if(req.params.date == 24){
        configDate.setDate(configDate.getDate() - 1);
    }if(req.params.date == 7){
        configDate.setDate(configDate.getDate() - 7);
    }if(req.params.date == 31){
        configDate.setMonth(configDate.getMonth() - 1);
    }
        HomeModel.find({ 
            date: { $lte: new Date(today), $gte: new Date(configDate)}

        },(err,office)=>{
        if(err){
            res.status(500).json(err);
        }
        res.json({
            message: "Houses by date loaded",
            data: office
        })
    })

},
// Price filter From 0 to 2000 
   priceFromTo: (req,res) =>{
   HomeModel.find({$and: [{
       price:  {$gte: req.params.from , $lte: req.params.to},
   }]},
       (err,home)=>{
           if(err){
               res.json(err);
           }
           res.json({
               message: "Homes filter by price From <> TO",
               data:home
           })
       })
   }
}
