const express=require('express');
const router=express.Router();
const path=require('path');
const rootDir=require('../utilPath/pathFile');
const cartController=require('../Controllers/cartController');
router.get('/add-to-cart',cartController.getCart);
router.post('/add-to-cart',cartController.postCart);
module.exports=router;
