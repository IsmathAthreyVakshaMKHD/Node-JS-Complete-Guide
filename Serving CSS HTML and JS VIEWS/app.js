const express=require('express');
const path=require('path');
const rootDir=require('./utilPath/pathFile');
const app=express();
const bodyParser=require('body-parser');
const adminRouter=require('./Routes/admin');
const shopRouter=require('./Routes/shop');
const contactusRouter=require('./Routes/contactus');
const successRouter=require('./Routes/success');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use('/admin',adminRouter);
app.use('/admin',contactusRouter);
app.use('/admin',successRouter);
app.use(shopRouter);
app.use('/',(request,response,next)=>
{
    response.status(404).sendFile(path.join(rootDir,'Views','404.html'));
})
app.listen(3000);