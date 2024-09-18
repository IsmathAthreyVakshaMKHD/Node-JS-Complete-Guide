const express=require('express');
const path=require('path');
const rootDir=require('../utilPath/pathFile');
const router=express.Router();
const successController=require('../Controllers/successController');
router.post('/success',successController.postSuccess);
router.get('/success',successController.getSuccess);
module.exports=router;