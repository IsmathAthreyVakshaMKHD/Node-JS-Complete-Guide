const express=require('express');
const path=require('path');
const rootDir=require('../utilPath/pathFile');
const router=express.Router();
router.post('/success',(request,response,next)=>
{
    response.redirect('/admin/success');
})
router.get('/success',(request,response,next)=>
{
    response.sendFile(path.join(rootDir,'Views','success.html'));
})
module.exports=router;