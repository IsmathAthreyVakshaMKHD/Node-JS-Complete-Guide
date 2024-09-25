const path=require('path');
const rootDir=require('../utilPath/pathFile');
const productClass=require('../Models/productModel');
exports.getProducts=(request,response,next)=>
{
    //const currentProduct=productClass.fetchAll(); //This is done using array
    productClass.fetchAll((fetchedProducts)=>{
        console.log("Fetched products are : "+`\n`+ JSON.stringify(fetchedProducts));
        response.sendFile(path.join(rootDir,'Views','add-product.html'));
    })
    //response.sendFile(path.join(rootDir,'Views','add-product.html'));
}
exports.postProducts=(request,response,next)=>
{
    const currentProduct=new productClass(request.body.title);
    currentProduct.save();
    //console.log(request.body.title);
    response.redirect('/');
}