const mongoose = require("mongoose");

const categoryModel = require('../Models/categoryModel');

module.exports = {
  create: function (req, res) {
    if (req.file.mimetype === "image/png" || req.file.mimetype === "image/jpeg" || req.file.mimetype === "image/jpg") {
      const Category = new categoryModel({
        _id: new mongoose.Types.ObjectId(),
        categoryName: req.body.categoryName,
        categoryImage: req.file.path,
        path: req.file.path,
        name: req.file.filename,
        type: req.file.mimetype,
      });

      if (req.body.properties) {
        const properties = req.body.properties;
        // Check if properties is an array with multiple values
        if (Array.isArray(properties) && properties.length > 0) {
          const propertiesWithKeys = properties.map(property => ({
            name: property.name,
            values: property.values
          }));
          Category.properties = propertiesWithKeys;
        } else if (typeof properties === "object") {
          // Handle single property value
          Category.properties = [{ name: properties.name, values: properties.values }];
        }
      }

      Category.save()
        .then(result => {
          console.log(result);
          res.send(result);
        })
        .catch(err => {
          res.send(err);
        });
    }
  }
  ,
  getAllCategories: function (req, res) {
    categoryModel.find().then(data => { res.send(data) }).catch(err => { res.send("Error: " + err) })
  }
  ,
  updateCategory: function (req, res) {
    const categoryId = req.params.id;
    const updatedCategoryData = req.body;

    if (req.file && (req.file.mimetype === "image/png" || req.file.mimetype === "image/jpeg" || req.file.mimetype === "image/jpg")) {
      // If an image file was uploaded, update the categoryImage field in the updatedCategoryData
      updatedCategoryData.categoryImage = req.file.path;
    } else if (req.file && req.file.mimetype) {
      // If an image file was uploaded, but it is of an unsupported type, send an error message
      return res.send("Invalid image type.");
    }

    categoryModel.findByIdAndUpdate(categoryId, updatedCategoryData)
      .then(updatedCategory => {
        if (updatedCategory) {
          res.send("Category updated successfully");
        } else {
          res.send("Category not found");
        }
      })
      .catch(err => {
        res.send("Error: " + err);
      });
  }
  ,
  deleteCategory: function (req, res) {
    const categoryId = req.params.id;
    categoryModel.findByIdAndDelete(categoryId)
      .then(response => {
        if (response) {
          res.send("Category deleted successfully");
        } else {
          res.send("Category not found");
        }
      })
      .catch(err => {
        res.send("Error: " + err);
      });
  }
  ,
  getCategoryById: function (req, res) {
    const categoryId = req.params.id;
    categoryModel.findById(categoryId)
      .then(category => {
        if (category) {
          res.send(category);
        } else {
          res.send("Category not found");
        }
      })
      .catch(err => {
        res.send("Error: " + err);
      });
  }
}