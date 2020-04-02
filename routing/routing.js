const router = require('express').Router();
const searchController = require('../controller/searchController');
// def response

router.get('/',(req,res)=>{
    res.json({
        status: 'API is working',
        message: 'welcome in rest api'
    });
});

//home routes
router.route('/home')
.get(searchController.index)
.post(searchController.new);


router.route('/home/:home_id')
.get(searchController.one);

// export api routes
module.exports = router;