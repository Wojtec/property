const router = require('express').Router();
const officeController = require('../controller/officeController');
const houseController = require('../controller/houseController');
const userController = require('../controller/userController');

//USER
//create new user
router.route('/user')
.get(userController.getUserList)
.post(userController.new);

//post home to user id 
router.route('/user/:id')
.get(userController.getOneUser)
.post(userController.userCollectionHouse);


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



// OFFICES
//route for get all offices and create new office 
router.route('/office')
.get(officeController.index)
.post(officeController.newOffice);

//route for get one office
router.route('/office/:office_id')
.get(officeController.oneOffice);

//route for get offices by buy or rent and by location
router.route('/office/:buyRent/:city')
.get(officeController.filterBuyRentCity);

//route for date 
router.route('/office/:buyRent/:city/:date')
.get(officeController.findByDate);

//route for filter offices by parameters by price
router.route('/office/:buyRent/:city/:price')
.get(officeController.findByPrice);

//route for fillter office by price From To
router.route('/office/:buyRent/:city/:from/:to')
.get(officeController.priceFilterOffice);

//route for fillter by all parameters
router.route('/office/:buyRent/:city/:building_use/:from/:to/:date')

// export api routes
module.exports = router;