const router = require('express').Router();
const officeController = require('../controller/officeController');
const houseController = require('../controller/houseController');
// HOMES
//route for get all homes and create new home
router.route('/home')
.get(houseController.index)
.post(houseController.new);

//route for get one home
router.route('/home/:home_id')
.get(houseController.one)
.delete(houseController.delete);

//route for get homes filtring by parameters
router.route('/home/:val/:type/:beds/:baths/:equipment/:condition')
.get(houseController.allParameters);

//route for get homes by price <>
router.route('/home/:from/:to')
.get(houseController.priceFromTo);



// OFFICE
//route for get all offices and create new office 
router.route('/office')
.get(officeController.index)
.post(officeController.newOffice);

//route for get one office
router.route('/office/:office_id')
.get(officeController.oneOffice);

//route for get homes by buy or rent and by location
router.route('/office/:buyRent/:city')
.get(officeController.filterBuyRentCity);

//route for date 
router.route('/office/:buyRent/:city/:date')
.get(officeController.findByDate);

//route for filter offices by parameters by price
router.route('/office/:buyRent/:city/:building_use/:price')
.get(officeController.findByParams);

//route for fillter office by price From To
router.route('/office/:buyRent/:city/:building_use?/:price?/:from/:to')
.get(officeController.priceFilterOffice);



// export api routes
module.exports = router;