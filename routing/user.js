const router = require('express').Router();
const userController = require('../controller/userController');
const upload = require('../libs/multer');

//USER
//create new user
router.route('/')
.get(userController.getUserList)
.post(userController.new);

//get user by id 
router.route('/:id')
.get(userController.getOneUser)
//post home to user by id 
router.route('/:id/home')
.post(userController.userCollectionHouse);
//post image to home by id
router.route('/:id/home/:home_id/image')
.post(upload.single('image'), userController.addImage)
.get(userController.getImage);
//post office to user by id
router.route('/:id/office')
.post(userController.userCollectionOffice);



// export api routes
module.exports = router;