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
// db.execute('SELECT * FROM products') //Sample Code
// .then((result)=>{
//     console.log('Retreived Database',result);
// })
// .catch((error)=>{
//     console.log('Retrieval Error',error);
// })
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use('/admin',adminRouter);
app.use('/admin',contactusRouter);
app.use('/admin',successRouter);
app.use('/admin',productListRouter);
app.use('/admin',cartRouter);
app.use(shopRouter);
app.use('/',errorController.getError);
app.listen(3000);