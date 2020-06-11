const router = require('express').Router();
const messageController = require('../controller/messageController');


// message router 
//send message 
router.route('/:user_id')
.post(messageController.saveMessage);



// export api routes
module.exports = router;

