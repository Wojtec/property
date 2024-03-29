const router = require('express').Router();
const officeController = require('../controller/officeController');


// OFFICES
//route for get all offices and create new office 
router.route('/')
.get(officeController.index)

//route for get one office
router.route('/:office_id')
.get(officeController.oneOffice);

//route for get offices by buy or rent and by location
router.route('/:buyRent/:city')
.get(officeController.filterBuyRentCity);

//route for date 
router.route('/buyRent/city/date/:date')
.get(officeController.findByDate);

//route for fillter office by price From To
router.route('/buyRent/city/price/:from/:to')
.get(officeController.priceFilterOffice);

//route for fillter by all parameters
router.route('/buyRent/city/:building_use/:from/:to/:date')
.get(officeController.allParameters);

// export api routes
module.exports = router;