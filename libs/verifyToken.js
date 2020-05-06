//import json web token
const jwt = require('jsonwebtoken');
//import secret from config.js
const config = require('../config/config');

module.exports = (req,res,next)=>{

    //check url,header or post parameters for token
    let token = req.headers['x-access-token'];
    if(!token){
        return res.status(403).send({
            auth: false,
            message:'No token provided'});
    }
    //verifies secret and check exp
    jwt.verify(token, config.secret, (err,decoded)=>{
        if(err){
            return res.status(500).send({
                auth: false,
                message: 'Failed to authenticate token'
            });
        };
    //if is authenticate correct
    req.userId = decoded.id;
    next();
    })

}