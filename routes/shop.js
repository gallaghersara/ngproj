var express = require('express')
var router = express.Router()
const mkBase = require('./util');


// const url = require('keys.mongodb.dbURI')
const pro = require('../models/item_model')

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

// define the shop page route
router.get('/', mkBase, async function (req, res) {
  // console.log(pro)
  var proGetitem = await pro.getItems()
  console.log(proGetitem[0])
  const Product = pro.Product
//  console.log(proGetitem.title)
  res.render('/shop', { 
    datas:proGetitem,
   
    // Image:proGetitem.image,
     user: '22222' 
    });
})

module.exports = router


