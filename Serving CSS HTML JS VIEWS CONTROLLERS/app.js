const express=require('express');
const path=require('path');
const rootDir=require('./utilPath/pathFile');
const app=express();
const bodyParser=require('body-parser');
const adminRouter=require('./Routes/admin');
const shopRouter=require('./Routes/shop');
const contactusRouter=require('./Routes/contactus');
const successRouter=require('./Routes/success');
const errorController=require('./Controllers/errorController');
const productListRouter=require('./Routes/productList');
const cartRouter=require('./Routes/cart');
// const db=require('./utilPath/database');
// db.execute('SELECT * FROM products') //Sample Code using to connect to Database directly without any 3rd party library
// .then((result)=>{
//     console.log('Retreived Database',result);
// })
// .catch((error)=>{
//     console.log('Retrieval Error',error);
// })
const sequelizeDb=require('./utilPath/database');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use('/admin',adminRouter);
app.use('/admin',contactusRouter);
app.use('/admin',successRouter);
app.use('/admin',productListRouter);
app.use('/admin',cartRouter);
app.use(shopRouter);
app.use('/',errorController.getError);
sequelizeDb.sync()
.then(result=>{
    // console.log(' sequelizeDb sync result =>',result);
    app.listen(3000);
})
.catch(err=>{
    console.log(' sequelizeDb sync error =>',err);
})
