const router = require('express').Router();
const messageController = require('../controller/messageController');


// message router 
//send message 
router.route('/:user_id')
.post(messageController.saveMessage);

//delete message
router.route('/:user_id/:message_id')
.delete(messageController.deleteMessage);

// export api routes
module.exports = router;

