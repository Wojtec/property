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


