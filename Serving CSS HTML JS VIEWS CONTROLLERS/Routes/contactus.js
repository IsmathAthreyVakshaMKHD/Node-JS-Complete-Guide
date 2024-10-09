const express=require('express');
const router=express.Router();
const path=require('path');
const rootDir=require('../utilPath/pathFile');
const contactusController=require('../Controllers/contactusController');
router.get('/contactus',contactusController.getContactus);
module.exports=router;