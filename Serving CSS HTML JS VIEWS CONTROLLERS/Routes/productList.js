const express=require('express');
const path=require('path');
const rootDir=require('../utilPath/pathFile');
const router=express.Router();
const productListController=require('../Controllers/productListController');
router.get('/product-list',productListController.getProductLists);
router.get('/product-list/:productId',productListController.getProductId);/*:(The colen indicates dynamic routing)*/
// The dynamic routes should be placed last while specific routes should be placed after it
module.exports=router;