const express=require('express');

const router=express.Router();

router.get('/',(request,response,next)=>
{
    response.send('<h1>From Express JS</h1>');
});

module.exports=router;