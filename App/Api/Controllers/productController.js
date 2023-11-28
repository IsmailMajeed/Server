const productModel = require('../Models/productModel')
const mongoose = require("mongoose");

module.exports = {
  create: function (req, res) {
    const files = req.files;
    // Assuming that you have other product properties in the req.body
    const { productName, price, discount, description, category, featured, Colours } = req.body;

    // Process the files and other product data as needed
    // Save the files to the database or any other storage
    // Create a new product using the product model
    const newProduct = new productModel({
      _id: new mongoose.Types.ObjectId(),
      productName: productName,
      price: price,
      discount: discount,
      description: description,
      images: files.map((file) => file.path), // Assuming the files are saved in the 'uploads' directory
      category: category,
      featured: featured,
      Colours: Colours,
    });
    if (req.body.Sizes) {
      newProduct.Sizes = req.body.Sizes
    }

    if (req.body.properties) {
      const properties = req.body.properties;
      // Check if properties is an array with multiple values
      if (Array.isArray(properties) && properties.length > 0) {
        const propertiesWithKeys = properties.map(property => ({
          name: property.name,
          values: property.values
        }));
        newProduct.properties = propertiesWithKeys;
      } else if (typeof properties === "object") {
        // Handle single property value
        newProduct.properties = [{ name: properties.name, values: properties.values }];
      }
    }

    // Save the new product to the database
    newProduct
      .save()
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((error) => {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Failed to create product.' });
      });
  }
  ,
  getAllProducts: function (req, res) {
    productModel.find().then(data => { res.send(data) }).catch(err => { res.send("Error: " + err) })
  },
  getProductsByIds: function (req, res) {
    const Ids = req.body.Ids;
    // Perform some action with the Ids here, for example, querying the database with the Ids
    productModel.find({ _id: { $in: Ids } })
      .then(data => res.send(data))
      .catch(err => res.status(500).send("Error: " + err));
  },
  removeAllFeatured: function (req, res) {
    const updateCondition = { featured: true };
    const updateData = { featured: false };

    productModel.updateMany(updateCondition, updateData)
      .then(() => {
        productModel.find()
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.send("Error retrieving products: " + err);
          });
      })
      .catch(err => {
        res.send("Error updating products: " + err);
      });
  }
  ,
  updateProduct: function (req, res) {
    const productId = req.params.id;
    const updatedProductData = {
      productName: req.body.productName,
      price: req.body.price,
      discount: req.body.discount,
      description: req.body.description,
      category: req.body.category,
      featured: req.body.featured,
      Colours: req.body.Colours,
      Sizes: req.body.Sizes,
    };
    
    // if (req.body.Sizes) {
    //   updatedProductData.Sizes = req.body.Sizes;
    // }

    const files = req.files;
    if (files && files.length > 0) {
      const imagePaths = files.map((file) => file.path);
      updatedProductData.images = req.body.images ? [...req.body.images, ...imagePaths] : imagePaths;
    }
    else {
      updatedProductData.images = req.body.images;
    }

    if (req.body.properties) {
      const properties = req.body.properties;
      // Check if properties is an array with multiple values
      if (Array.isArray(properties) && properties.length > 0) {
        const propertiesWithKeys = properties.map(property => ({
          name: property.name,
          value: property.value
        }));
        updatedProductData.properties = propertiesWithKeys;
      } else if (typeof properties === "object") {
        // Handle single property value
        updatedProductData.properties = [{ name: properties.name, values: properties.values }];
      }
    }

    productModel.findByIdAndUpdate(productId, updatedProductData, { new: true })
      .then(updatedProduct => {
        if (updatedProduct) {
          res.send("Product updated successfully");
        } else {
          res.send("Product not found");
        }
      })
      .catch(err => {
        res.send("Error: " + err);
      });
  }
  ,
  deleteProduct: function (req, res) {
    const productId = req.params.id;
    productModel.findByIdAndDelete(productId)
      .then(response => {
        if (response) {
          res.send("Product deleted successfully");
        } else {
          res.send("Product not found");
        }
      })
      .catch(err => {
        res.send("Error: " + err);
      });
  }
  ,
  getProductsByCategoryId: function (req, res) {
    productModel.find({ category: req.params.id })
      .then(products => {
        res.send(products);
      })
      .catch(err => {
        res.send("Error: " + err);
      });
  },
  getAllFeatures: function (req, res) {
    productModel.find({ featured: true })
      .then(data => {
        const featuredProducts = data.filter(product => product.featured === true);
        res.send(featuredProducts);
      })
      .catch(err => { res.send("Error: " + err) });
  },
  getProductById: function (req, res) {
    const productId = req.params.id;
    productModel.findById(productId)
      .then(product => {
        if (product) {
          res.send(product);
        } else {
          res.send("Product not found");
        }
      })
      .catch(err => {
        res.send("Error: " + err);
      });
  }
}