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
            res.status(404).send(err);
        }
        res.writeHead(200, { 'Content-Type': 'text/json',
    }).json({
            message: "home loading",
            data: home

        })
        res.end();
        
    })
}