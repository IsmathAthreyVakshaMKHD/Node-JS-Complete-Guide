const express=require('express');
const path=require('path');
const rootDir=require('../utilPath/pathFile');
const router=express.Router();
const contactusController=require('../Controllers/contactusController');
router.get('/contactus',contactusController.getContactus);
module.exports=router;