const router = require('express').Router();
const houseController = require('../controller/houseController');

// HOMES
//route for get all homes and create new home
router.route('/')
.get(houseController.index)

//route for get one home
router.route('/:home_id')
.get(houseController.one)

//route for get houses by buy or rent and by location
router.route('/:buyRent/:city')
.get(houseController.filterBuyRentCity);

//route for filleter by date 
router.route('/buyRent/city/date/:date')
.get(houseController.findByDate);

//route for get homes by price <>
router.route('/buyRent/city/price/:from/:to')
.get(houseController.priceFromTo);

//route for get homes filtring by parameters
router.route('/buyRent/city/:m2/:type/:beds/:baths/:equipment/:condition/:balcony/:heating/:floor/:lift/:guard/:from/:to/:date')
.get(houseController.allParameters);

// export api routes
module.exports = router;