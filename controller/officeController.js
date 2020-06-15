const OfficeModel = require('../model/officeModel');
module.exports = {
//handle index actions
    index: async (req,res)=>{
    OfficeModel.get((err,office)=>{
       if(err){
           res.status(500).json({
               status: "error",
               message: err,
           });   
       }
       res.status(200).header("Access-Control-Allow-Origin", "*").json({
           status: "succes",
           message: "Office list",
           data: office
       });
   });
},
//get office by id
    oneOffice: async(req,res)=>{
       await OfficeModel.findById(req.params.office_id,(err,office)=>{
            if(err){
                res.status(500).json(err);
            }
            res.status(200).header("Access-Control-Allow-Origin", "*").json({
                message: 'Office loading...',
                data: office
            })

        })
    },

//Filter price office From To
    priceFilterOffice: (req,res)=>{
        OfficeModel.find(
            {price: {$gte: req.params.from , $lte: req.params.to}
        },(err,office)=>{
    if(err){
        res.status(500).json(err);
    }
    res.status(200).header("Access-Control-Allow-Origin", "*").json({
        message: "Offices filter by price",
        data: office
    })

        })

    },
//Filter office by buyRent and city
    filterBuyRentCity:async (req,res)=>{
       await OfficeModel.find({ $and: [{
            buyRent: req.params.buyRent,
            "address.city": req.params.city
        }]},(err,office)=>{
            if(err){
                res.status(500).json(err)

            }
            res.status(200).header("Access-Control-Allow-Origin", "*").json({
                message: "Office filter by buyRent and City",
                data: office
                
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
    OfficeModel.find({$and: [
    {building_use: req.params.building_use},
    {price: {$gte: req.params.from , $lte: req.params.to}},
    {date: { $lte: new Date(today), $gte: new Date(configDate)}},
    ]},
    (err,office)=>{
    if(err){
        res.json(err);
    }
    res.status(200).header("Access-Control-Allow-Origin", "*").json({
        message:"Offices by all parameters loading",
        data: office
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
            OfficeModel.find({ 
                date: { $gte: new Date(configDate)}

            },(err,office)=>{
            if(err){
                res.status(500).json(err);
            }
            res.status(200).header("Access-Control-Allow-Origin", "*").json({
                message: "offices by date loaded",
                data: office
            })
        })

    }
    




}






