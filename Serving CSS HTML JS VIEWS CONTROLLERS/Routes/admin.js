const express=require('express');
const path=require('path');
const rootDir=require('../utilPath/pathFile');
const router=express.Router();
const productController=require('../Controllers/productController');
router.get('/add-product',productController.getProducts);
router.post('/add-product',productController.postProducts);
module.exports=router;