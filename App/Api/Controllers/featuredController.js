const mongoose = require("mongoose");

const featuredModel = require('../Models/FeaturedModel');

const allowedMimetypes = ['image/png', 'image/jpeg', 'image/jpg'];
module.exports = {
  create: function (req, res) {
    if (
      allowedMimetypes.includes(req.files['file1'][0].mimetype) &&
      allowedMimetypes.includes(req.files['file2'][0].mimetype)
    ) {
      const Featured = new featuredModel({
        _id: new mongoose.Types.ObjectId(),
        bigImg: req.files['file1'][0].path,
        smallImg: req.files['file2'][0].path,
        path1: req.files['file1'][0].path,
        name1: req.files['file1'][0].filename,
        type1: req.files['file1'][0].mimetype,
        path2: req.files['file2'][0].path,
        name2: req.files['file2'][0].filename,
        type2: req.files['file2'][0].mimetype,
      });
      Featured.save().then(result => {
        console.log(result);
        res.send(result);
      }).catch(err => {
        res.send(err)
      });
    }
  }
  ,
  getFeatured: function (req, res) {
    featuredModel.find().then(data => { res.send(data) }).catch(err => { res.send("Error: " + err) })
  }
  ,
  updateFeatured: async function (req, res) {
    const { id } = req.params;
  
    // Check if file1 and file2 exist in the request files
    const hasFile1 = req.files && req.files['file1'] && allowedMimetypes.includes(req.files['file1'][0].mimetype);
    const hasFile2 = req.files && req.files['file2'] && allowedMimetypes.includes(req.files['file2'][0].mimetype);
  
    try {
      // Find the featured item by its ID in the database
      const featured = await featuredModel.findById(id);
  
      if (!featured) {
        return res.status(404).json({ error: 'Featured item not found.' });
      }
  
      // Update the featured item based on file availability
      if (hasFile1) {
        featured.bigImg = req.files['file1'][0].path;
      }
  
      if (hasFile2) {
        featured.smallImg = req.files['file2'][0].path;
      }
  
      // Save the updated featured item
      const updatedFeatured = await featured.save();
  
      res.json(updatedFeatured);
    } catch (err) {
      res.status(500).json({ error: 'Error while updating the featured item.' });
    }
  }  
  ,
  deleteFeatured: function (req, res) {
    const featuredId = req.params.id;
    featuredModel.findByIdAndDelete(featuredId)
      .then(response => {
        if (response) {
          res.send("Featured deleted successfully");
        } else {
          res.send("Featured not found");
        }
      })
      .catch(err => {
        res.send("Error: " + err);
      });
  }
  ,
  getFeaturedById: function (req, res) {
    const featuredId = req.params.id;
    featuredModel.findById(featuredId)
      .then(featured => {
        if (featured) {
          res.send(featured);
        } else {
          res.send("Featured not found");
        }
      })
      .catch(err => {
        res.send("Error: " + err);
      });
  }
}