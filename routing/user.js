const router = require('express').Router();
const userController = require('../controller/userController');
const upload = require('../libs/multer');
const verifyToken = require('../libs/verifyToken');


//USER
//Get users list
router.route('/')
.get(userController.getUserList);

//Register new user
router.route('/register')
.post(userController.new);

//get me test 
router.route('/me')
.get(verifyToken,userController.meTest);

//Login user
router.route('/login')
.post(userController.login);

//get user by id 
router.route('/:id')
.get(userController.getOneUser);

//HOME
//post home to user by id 
router.route('/home')
.post(verifyToken,userController.userCollectionHouse);

//delete home by id
router.route('/home/:home_id')
.delete(verifyToken,userController.deleteHouse);

//post image to home by id
router.route('/home/:home_id/image')
.post(verifyToken,upload.single('image'), userController.addImageHouse)

//OFFICE
//post office to user by id
router.route('/office')
.post(verifyToken,userController.userCollectionOffice);

//delete office by id
router.route('/office/:office_id')
.delete(verifyToken,userController.deleteOffice);

//post image to office by id
router.route('/office/:office_id/image')
.post(verifyToken,upload.single('image'), userController.addImageOffice)

// export api routes
module.exports = router;


