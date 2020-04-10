const router = require('express').Router();
const houseController = require('../controller/houseController');

// HOMES
//route for get all homes and create new home
router.route('/')
.get(houseController.index)
.post(houseController.new);

//route for get one home
router.route('/:home_id')
.get(houseController.one)
.delete(houseController.delete);

//route for get homes filtring by parameters
router.route('/:val/:type/:beds/:baths/:equipment/:condition')
.get(houseController.allParameters);

//route for get homes by price <>
router.route('/:from/:to')
.get(houseController.priceFromTo);


// export api routes
module.exports = router;