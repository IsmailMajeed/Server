const mongoose = require("mongoose");

const orderModel = require('../Models/orderModel');

module.exports = {
  create: function (req, res) {
    req.body.status = 'Processing';
    orderModel.create(req.body).then(items => { res.send(items) })
      .catch(err => { res.send('Something went wrong: ' + err) })
  },
  getAllorders: function (req, res) {
    orderModel.find().then(data => { res.send(data) }).catch(err => { res.send("Error: " + err) })
  }
  ,
  updateOrder: function (req, res) {
    const orderId = req.params.id;
    const updatedOrderData = req.body;

    orderModel.findByIdAndUpdate(orderId, updatedOrderData)
      .then(updatedOrder => {
        if (updatedOrder) {
          res.send("Order updated successfully");
        } else {
          res.send("Order not found");
        }
      })
      .catch(err => {
        res.send("Error: " + err);
      });
  },
  updateOrderStatus: function (req, res) {
    const orderId = req.params.id;
    const updatedStatus = req.body.status;

    orderModel.updateOne({ _id: orderId }, { $set: { status: updatedStatus } })
      .then(result => {
        if (result.nModified > 0) {
          res.send(updatedStatus); // Send only the updated status in the response
        } else {
          res.send("Order not found");
        }
      })
      .catch(err => {
        res.send("Error: " + err);
      });
  }
  ,
  deleteOrder: function (req, res) {
    const orderId = req.params.id;
    orderModel.findByIdAndDelete(orderId)
      .then(response => {
        if (response) {
          res.send("Order deleted successfully");
        } else {
          res.send("Order not found");
        }
      })
      .catch(err => {
        res.send("Error: " + err);
      });
  }
  ,
  getOrderById: function (req, res) {
    const orderId = req.params.id;
    orderModel.findById(orderId)
      .then(order => {
        if (order) {
          res.send(order);
        } else {
          res.send("Order not found");
        }
      })
      .catch(err => {
        res.send("Error: " + err);
      });
  }
}