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
       res.status(200).header("Access-Control-Allow-Origin", "*").json({
           status: "Success",
           message: "Houses list",
           data: home
       });
   });
},
// select house by id
   one: (req,res)=>{
   HomeModel.findById(req.params.home_id, (err,home)=>{
       if(err){
           res.json(err);
       }
       res.status(200).header("Access-Control-Allow-Origin", "*").json({
           message: "Home loading",
           data: home

       })
       
   })
},

//Filter office by buyRent and city
filterBuyRentCity:async (req,res)=>{
   await HomeModel.find({ $and: [
        {buyRent:req.params.buyRent}, 
        {"address.city": req.params.city}
    ]},(err,home)=>{
        if(err){
            res.status(500).json(err)

        }
        res.status(200).header("Access-Control-Allow-Origin", "*").json({
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
       HomeModel.find({ $and:[
       {"basicFeatures.m2": { $gte: req.params.m2}},
       {"basicFeatures.type": req.params.type},
       {"basicFeatures.bedrooms": req.params.beds},
       {"basicFeatures.bathrooms": req.params.baths},
       {"basicFeatures.equipment": req.params.equipment},
       {"basicFeatures.condition": req.params.condition},
       {"basicFeatures.balcony": req.params.balcony},
       {"basicFeatures.heating": req.params.heating},
       {"building.floor": req.params.floor},
       {"building.lift": req.params.lift},
       {"building.guard": req.params.guard},
       {price: {$gte: req.params.from, $lte: req.params.to }},
       {date: {$gte: new Date(configDate)}}
       ]},
       (err,home)=>{
       if(err){
           res.json(err);
       }
       res.status(200).header("Access-Control-Allow-Origin", "*").json({
           message:"Homes by parameters loading",
           data:home
       })
   })
},
// Date filter from to 
findByDate: async (req,res)=>{
       
    const today = new Date();
    const configDate = new Date(today);
    if(req.params.date == 24){
        configDate.setDate(configDate.getDate() - 1);
    }if(req.params.date == 7){
        configDate.setDate(configDate.getDate() - 7);
    }if(req.params.date == 31){
        configDate.setMonth(configDate.getMonth() - 1);
    }
      await HomeModel.find({ 
            date: { $gte: new Date(configDate)}

        },(err,home)=>{
        if(err){
            res.status(500).json(err);
        }
        res.status(200).header("Access-Control-Allow-Origin", "*").json({
            message: "Houses by date loaded",
            data: home
        })
    })

},
// Price filter From 0 to 2000 
   priceFromTo: async (req,res) =>{
       console.log(req);
  await HomeModel.find({
       price:  {$gte: req.params.from , $lte: req.params.to},
   },
       (err,home)=>{
           if(err){
               res.json(err);
           }
           res.status(200).header("Access-Control-Allow-Origin", "*").json({
               message: "Homes filter by price From <> TO",
               data:home
           })
       })
   }
}
