var express = require('express')
const router = express.Router()
var orderController = require('../App/Api/Controllers/orderController')

router.post('/addNewOrder', orderController.create);
router.get('/getAllOrders', orderController.getAllorders);
router.put('/updateOrder/:id', orderController.updateOrder);
router.put('/updateOrderStatus/:id', orderController.updateOrderStatus);
router.get('/getOrderById/:id', orderController.getOrderById);
router.delete('/deleteOrder/:id', orderController.deleteOrder);

module.exports = router