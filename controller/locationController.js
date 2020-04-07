const locationModel = require('../model/locationModel');

module.exports = {

// get all locations 
index:(req,res)=>{
    locationModel.get((err,location)=>{
        if(err){
            res.json({
                status: 'error',
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "location list loaded",
            data: location
        });
    });

},
newLocation: (req,res)=>{
    let loca = new locationModel();
    loca.street = req.body.street,
    loca.city = req.body.city,
    loca.postCode = req.body.postCode,
    loca.country = req.body.country
    loca.save((err)=>{
        if(err){
            res.json(err);
        }
        res.json({
            message: "New location add ++",
            data: loca
        })
    }).then(console.log(loca));

}






}