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
    //Here we are creating a new instance of the Product class to pass the values to the save method and keys used here will not appear in the final resultant json objects
    const currentProduct=new productClass({
        title:request.body.title,
        'image-url':request.body['image-url'],//The key for this need to match the one we are using in the contructor for example we using this['image-url'] as a key to value but when we a instance with the key something like imageurl or imageUrl this key is not mentioned in the constructor and this['image-url'] we have used gives as undefined which is why it is not displayed in the resultant json object when different key name are used for the instance creation
        price:request.body.price,
        description:request.body.description
        });
    currentProduct.save();
    //console.log(request.body.title);
    response.redirect('/');
}