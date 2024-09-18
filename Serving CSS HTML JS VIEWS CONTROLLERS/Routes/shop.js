const express=require('express');
const path=require('path');
const rootDir=require('../utilPath/pathFile');
const router=express.Router();
const shopController=require('../Controllers/shopController');
router.get('/',shopController.getShop);
module.exports=router;
