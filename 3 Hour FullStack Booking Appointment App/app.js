const path=require('path');
const rootDir=require('./utilPath/pathFile');
const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const sequelizeDb=require('./utilPath/database');
const adminRouter=require('./Routes/admin');
const bookingModelRouter=require('./Model/bookingModel');
app.use(bodyParser.urlencoded({extended:true}));
app.use('/admin',adminRouter);
sequelizeDb.sync()
.then(()=>{
    app.listen(3000);
})
.catch(err=>{
    console.log('sequelizeDb sync error =>',err);
})
