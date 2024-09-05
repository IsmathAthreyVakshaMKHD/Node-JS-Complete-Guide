const express=require('express');

const bodyParser=require('body-parser');

const app=express();

const adminRouter=require('./Routes/admin');

const shopRouter=require('./Routes/shop');

app.use(bodyParser.urlencoded({extended:true}));

app.use('/admin',adminRouter);

app.use(shopRouter);

app.use('/',(request,response,next)=>
{
    response.status(404).send('<h1>Implementing status code 404</h1>');
})

app.listen(3000);