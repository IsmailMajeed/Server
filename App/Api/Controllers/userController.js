const userModel = require('../Models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  create: function (req, res) {
    req.body.pageRoll = 0;
    userModel.create(req.body).then(items => { res.send("Successfully Registered") })
      .catch(err => { res.send('Something went wrong: ' + err) })
  },

  authenticate: async function (req, res, next) {
    try {
      const userInfo = await userModel.findOne({ email: req.body.email });

      if (!userInfo) {
        res.status(404).json({ status: "error", message: "User not found" });
      } else if (userInfo.pageRoll === 0 && req.body.pageRoll === 0) {
        if (bcrypt.compareSync(req.body.password, userInfo.password)) {
          const token = jwt.sign(
            { id: userInfo._id },
            req.app.get("secretKey"),
            { expiresIn: "1h" }
          );
          res.json({
            status: "success",
            message: "User found!",
            token: token,
            firstname: userInfo.firstname,
            lastname: userInfo.lastname,
            email: userInfo.email
          });
        } else {
          res.status(401).json({
            status: "error",
            message: "Invalid password",
          });
        }
      }
      else {
        res.status(404).json({ status: "error", message: "User don't belongs to this page" });
      }
    } catch (err) {
      next(err);
    }
  },
  authenticateAdmin: async function (req, res, next) {
    try {
      const userInfo = await userModel.findOne({ email: req.body.email });

      if (!userInfo) {
        res.status(404).json({ status: "error", message: "User not found" });
      } else if (req.body.pageRoll === 1 && userInfo.pageRoll === 1) {
        if (bcrypt.compareSync(req.body.password, userInfo.password)) {
          const token = jwt.sign(
            { id: userInfo._id },
            req.app.get("secretKey"),
            { expiresIn: "1h" }
          );
          res.json({
            status: "success",
            message: "User found!",
            token: token,
            firstname: userInfo.firstname,
            lastname: userInfo.lastname,
            email: userInfo.email
          });
        } else {
          res.status(401).json({
            status: "error",
            message: "Invalid password",
          });
        }
      }
      else {
        res.status(404).json({ status: "error", message: "User don't belongs to this page" });
      }
    } catch (err) {
      next(err);
    }
  }
}