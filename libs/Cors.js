
module.exports = {



    corsMiddleware: (req, res, next) =>{
        res.header('Access-Control-Allow-Origin', 'https://esteapp.herokuapp.com/');
        res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, PATCH, POST, DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization');
    
        next();
    }


}