const path=require('path');
const rootDir=require('../utilPath/pathFile');
const fs=require('fs');
const productClass=require('../Models/productModel');
exports.getProducts=(request,response,next)=>
{
    productClass.fetchAll()
    .then(([rows,fieldData])=>{
        // console.log("Fetched products are : "+`\n`+ JSON.stringify(rows));
        response.sendFile(path.join(rootDir,'Views','add-product.html'));
    })
    .catch((err)=>{
        console.log("getProducts FetchAll() error =>",err);
    })
}
exports.postProducts=(request,response,next)=>
{
    const currentProduct=new productClass({
        id:null,
        title:request.body.title,
        'image-url':request.body['image-url'],
        price:request.body.price,
        description:request.body.description
        });
    currentProduct.save()
    .then(()=>{
        response.redirect('/');
    })
    .catch(err=>{
        console.log('postProducts error',err);
    });
    
}
exports.editProducts=(request,response,next)=>
{
    // console.log('Request =>',request);
    // console.log('Request url =>',request.url);
    // console.log('Request method =>',request.method);
    // console.log('Request query =>',request.query);
    // console.log('Product id =>',request.params.productId);
    const editMode=request.query.edit;
    // console.log('Before checking editMode =>',editMode);
    if(!editMode){
        console.log('editMode =>','False');
        return response.redirect('/');
    }
    // console.log('After checking editMode =>',editMode);
    const fetchedId=request.params.productId;//The productId is from admin.js in Routes using dynamic url setting which is similar to what is used in productList.js in Routes
    productClass.findById(fetchedId,productPtr=>{
        if(!productPtr){
            console.log('Product not found');
            return response.redirect('/');
        }
        fs.readFile(path.join(rootDir,'Views','edit-product.html'),'utf-8',(error,templete)=>{
            if(error){
                console.log('Error reading templete:',error);
                return response.status(500).send('Server error');
            }
            const modifiedHtmlTemplete=templete
            .replace('<input type="hidden" name="id" id="id">',
                `<input type="hidden" name="id" id="id" value="${productPtr.id}">`)
            .replace('<input type="text" name="title" id="title">',
                `<input type="text" name="title" id="title" value="${productPtr.title||''}">`)
            .replace('<input type="url" name="image-url" id="image-url">',
                `<input type="url" name="image-url" id="image-url" value="${productPtr.imageUrl||''}">`)
            .replace('<input type="number" name="price" id="price">',
                `<input type="number" name="price" id="price" value="${productPtr.price||''}">`)
            .replace('<textarea name="description" id="description" rows="5" cols="38"></textarea>',
                `<textarea name="description" id="description" rows="5" cols="38">${productPtr.description||''}</textarea>`)
            response.send(modifiedHtmlTemplete);
        });
    });
};
exports.postEditProducts=(request,response,next)=>
{
    console.log('Request Body =>',request.body);
    const updatedProduct=new productClass({
        id:request.body.id,
        title:request.body.title,
        'image-url':request.body['image-url'],//The key for this need to match the one we are using in the contructor for example we using this['image-url'] as a key to value but when we a instance with the key something like imageurl or imageUrl this key is not mentioned in the constructor and this['image-url'] we have used gives as undefined which is why it is not displayed in the resultant json object when different key name are used for the instance creation
        price:request.body.price,
        description:request.body.description
        });
        console.log('Updated Product with Id =>',updatedProduct.id);
    updatedProduct.save();
    response.redirect('/admin/product-list');
}

exports.postDeleteProducts=(request,response,next)=>
{
    const productId=request.body.deleteId;
    productClass.deleteProductById(productId)
    .then(()=>{
        response.redirect('/admin/product-list');
    })
    .catch((err)=>{
        response.status(500).send('Error deleting product');
    })
};
