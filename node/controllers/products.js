const express = require('express')
const Router = express.Router()
const productsModel = require('../schema/productschema')


Router.post('/addProduct', async (req, res) => {
  
  const newProduct = new productsModel({

    name: req.body.productName,
    description: req.body.productDescription,
    price: req.body.productPrice,
    quantity: req.body.productQuantity,
  
  });
  try {
    const product = await newProduct.save();
    console.log("------products----------", product);
    if (!product) {
      res.status(200).send("Internal server error");
    } else {
      res.status(200).json({product:product,id:product._id});
    }
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).send("Internal server error");
  }

})

Router.get('/getProductList', async (req, res) => {
  try {
    const products = await productsModel.find();
    res.json(products);

  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, './uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
  }
})

const upload = multer({ storage: storage })

Router.post('/uploadImage/:id', async (req, res, next) => {
  const id = req.params.id;
  upload.single('image')(req, res, async (err) => {
    if (err) {
      console.error('File upload error:', err);
      return res.status(400).json({ error: 'File upload error', details: err.message });
    }
    if (!req.file) {
      return res.status(200).send("No file");
    }
    const image = req.file.filename;
    try {
      const product = await productsModel.findByIdAndUpdate(id, { image: image });
      console.log("-------Added_Product------", product, "Added Image", image)
      res.status(200).send("File uploaded successfully");
    } catch (error) {
      console.error('Database update error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});


module.exports = Router