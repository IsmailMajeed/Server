var express = require('express')
const router = express.Router()
var userController = require('../App/Api/Controllers/userController')
router.post('/register', userController.create);
router.post('/authenticate',userController.authenticate);
router.post('/authenticateAdmin',userController.authenticateAdmin);

module.exports = router