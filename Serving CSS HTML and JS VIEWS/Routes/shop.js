const express=require('express');
const path=require('path');
const rootDir=require('../utilPath/pathFile');
const router=express.Router();
router.get('/',(request,response,next)=>
{
    response.sendFile(path.join(rootDir,'Views','shop.html'));
})
module.exports=router;
