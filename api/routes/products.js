const express = require('express');

const route = express();
const productModel = require('../models/produc');
const mongoos = require('mongoose');
route.get('/', (req, res) => {
  productModel.find()
    .exec()
    .then(result => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          code: "404",
          massage: "Not Found"
        });
      }
    })
    .catch(err => {
      console.log('0@@ ERROR', err);
    });

});

route.post('/', (req, res) => {
  const product = new productModel({
    _id: new mongoos.Types.ObjectId(),
    productName: req.body.productName,
    price: req.body.price,
  });

  product.save().then(result => {
    if (result) {
      res.status(201).json(result)
      console.log(result)
    } else {
      res.status(404).json({
        code: "404",
        massage: "Not Found"
      })
      console.log(result)
    }


  }).catch(err => {
    console.log('0@@ ERROR', err);
  });

});

route.get('/:productId', (req, res) => {
  const id = req.params.productId;
  productModel.findById(id).exec().then(result => {
    if (result) {
      res.status(200).json(result)
      console.log(result)
    } else {
      res.status(404).json({
        code: "404",
        massage: "Not Found"
      })
      console.log(result)
    }
  }).catch(err => {
    res.status(500).json(err);
    console.log(err);
  })
});

route.delete('/:productId', function (req, res) {
  const id = req.params.productId;
  productModel.remove({_id: id}).exec().then(result => {
    res.status(200).json(result)
    console.log(result)
  }).catch(err => {
    res.status(500).json(err);
    console.log(err);
  })
});


module.exports = route;