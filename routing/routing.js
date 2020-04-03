const searchController = require('../controller/searchController');
const router = require('express').Router();

// def response



//route for get all homes
router.route('/')
.get(searchController.index)
.post(searchController.new);

//route for get one home
router.route('/home/:home_id')
.get(searchController.one)
.delete(searchController.delete);

//route for get homes filtring by parameters
router.route('/home/:val/:type/:beds/:baths/:equipment/:condition')
.get(searchController.allParameters);

//route for get homes by price <>
router.route('/home/:from?/:to?')
.get(searchController.priceFromTo);



// export api routes
module.exports = router;