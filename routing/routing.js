let router = require('express').Router();

// def response

router.get('/',(req,res)=>{
    res.json({
        status: 'API is working',
        message: 'welcome in rest api'
    });
});

module.exports = router;