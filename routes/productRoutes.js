const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    //cb(null, new Date().toISOString() + file.originalname);
    cb(null, (new Date().toISOString().replace(/:/g, '-') + file.originalname).replace(/ /g,''));
  }
});

const fileFilter = (req, file, cb) => {
  
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    // reject a file
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10 //10 MB max size
  },
  fileFilter: fileFilter
});

const User = require('../models/User');
const Product = require('../models/Product');

router.get('/sell', (req, res) => {
    res.render('sell');
});

router.post('/sell/:id', upload.array('uploadedImages', 4), async (req, res) => {
    // if (err) {
    //     console.log('error');
    //     console.log(err);
    //   }
    var file = req.files;
    var image = [,,,];
    var i = 0;
    for (const {path} of file) {
        image[i] = path;
        i++;
    }
    // console.log(image);
    const {name, price, description} = req.body;
    // console.log(description);
    const userId = req.params.id;
    const user_ = await User.findOne({userId})
    const sellerId = user_._id;
    const newPro = await Product.create({
        sellerId,
        name,
        image,
        description,
        price
    });
    //   console.log(name);
    //   console.log(price);
    //   console.log(desc);
    //   console.log(file);
    console.log(newPro);
    res.redirect('/products/view');
});

router.get('/view', async (req, res) => {
    try{
        const pro = await Product.find().sort({createdAt: -1});
        //const user_ = await
        res.render('product-view', {products: pro});
    }catch(err){
        console.log(err);
    }
});

router.get('/view/:id', async (req, res) => {
    const id = req.params.id;
    try{
        const product = await Product.findById(id);
        const userId = product.sellerId;
        const user_ = await User.findById(userId);
        const email = user_.email;
        console.log(product);
        console.log(email);
        res.render('product-description', {product: product, email: email});
    }catch(err){
        console.log(err);
    }
})
    

module.exports = router;
