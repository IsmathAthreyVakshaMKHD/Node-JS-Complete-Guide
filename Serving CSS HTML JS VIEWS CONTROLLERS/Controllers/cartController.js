const path=require('path');
const rootDir=require('../utilPath/pathFile');
const productClass=require('../Models/productModel');
const cartClass=require('../Models/cartModel');
exports.getCart=(request,response,next)=>
{
    response.sendFile(path.join(rootDir,'Views','cart.html'));
}
exports.postCart=(request,response,next)=>
{
    const receivedId=request.body.cartProductId;
    productClass.findById(receivedId,(data)=>{
        cartClass.addProduct(receivedId,data.price);
    })
    console.log('Cart Item Id: ',receivedId);
    response.redirect('/admin/add-to-cart');
}