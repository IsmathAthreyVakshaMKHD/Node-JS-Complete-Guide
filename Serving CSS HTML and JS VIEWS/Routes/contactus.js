const express=require('express');
const path=require('path');
const rootDir=require('../utilPath/pathFile');
const router=express.Router();
router.get('/contactus',(request,response,next)=>
{
    response.sendFile(path.join(rootDir,'Views','contactus.html'));
})
module.exports=router;