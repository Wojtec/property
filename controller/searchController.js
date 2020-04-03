const SearchModel = require('../model/searchModel');

//handle index actions
exports.index = (req,res)=>{
    SearchModel.get((err,house)=>{
        if(err){
            res.status(404).json({
                status: "error",
                message: err,
            });   
        }
        res.json({
            status: "succes",
            message: "Houses list",
            data: house
        });
        res.end();

    });
};

//handle create house
exports.new = (req,res) => {
   
    let house = new SearchModel();
    house.image = req.body.image,
    house.title = req.body.title,
    house.price = req.body.price,
    house.description = req.body.description,
    house.type = req.body.type,
    house.bedrooms = req.body.bedrooms,
    house.bathrooms = req.body.bathrooms,
    house.equipment = req.body.equipment,
    house.condition = req.body.condition,
    house.date = req.body.date

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
};

// select one house
exports.one = (req,res)=>{
    SearchModel.findById(req.params.home_id, (err,home)=>{
        if(err){
            res.json(err);
        }
        res.json({
            message: "Home loading",
            data: home

        })
        
    })
}
// Delete house by id
exports.delete = (req,res)=>{
    SearchModel.deleteOne({
        _id:req.params.home_id
    },(err, home)=>{
        if(err)
            res.send(err);
        res.json({
            status:'Success',
            message: 'Home deleted'
        })
    })
}
// Filter by all parameters
exports.allParameters = (req,res)=>{
    console.log(parseInt(req.params.val));
    console.log(req.params.to);
        SearchModel.find({$or: [{
        price : req.params.val,
        type: req.params.type,
        bedrooms: req.params.beds,
        bathrooms: req.params.baths,
        equipment: req.params.equipment,
        condition: req.params.condition
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
}

// Price filter From 0 to 2000 
exports.priceFromTo = (req,res) =>{
    SearchModel.find({$and: [{
        price:  {$gte: req.params.from , $lte: req.params.to},
        price:  {$lte: req.params.to, $gte:req.params.from}
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
