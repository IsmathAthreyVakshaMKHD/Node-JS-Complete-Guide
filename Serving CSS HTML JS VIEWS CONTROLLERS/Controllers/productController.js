const path=require('path');
const rootDir=require('../utilPath/pathFile');
const fs=require('fs');
const productClass=require('../Models/productModel');
exports.getProducts=(request,response,next)=>
{   //The below method is using sequelize
    productClass.findAll()
    .then(fetchedProducts=>{
        // console.log("Fetched products:", fetchedProducts);
        response.sendFile(path.join(rootDir,'Views','add-product.html'));
    })
    .catch(err=>{
        console.log("getProducts findAll() error =>",err);
    });
    //The below method is used before sequelize
    // productClass.fetchAll()
    // .then(([rows,fieldData])=>{
    //     // console.log("Fetched products are : "+`\n`+ JSON.stringify(rows));
    //     response.sendFile(path.join(rootDir,'Views','add-product.html'));
    // })
    // .catch((err)=>{
    //     console.log("getProducts FetchAll() error =>",err);
    // })
    // This is used midway when  implementing the sequelize one at a time
    // response.sendFile(path.join(rootDir,'Views','add-product.html'));
}
exports.postProducts=(request,response,next)=>
{
    //The below method is used for mysql without sequelize and with sequel commands 
    // const currentProduct=new productClass({
    //     id:null,
    //     title:request.body.title,
    //     'image-url':request.body['image-url'],
    //     price:request.body.price,
    //     description:request.body.description
    //     });
    // currentProduct.save()
    // .then(()=>{
    //     response.redirect('/');
    // })
    // .catch(err=>{
    //     console.log('postProducts error',err);
    // });
    //
    const{title,imageurl,price,description}=request.body;
    // This below method is javascript shorthand property names which can used when the keyname in the object and variable name are identical i.e when the keyname and the database column name is identical
    // productClass.create({
    //     title,
    //     imageurl,
    //     price,
    //     definition
    // })
    // The below method is explicit assigment when the object keyname and variable name differs imageur i.e when keyname differ from the database column name
    productClass.create({
        title:title,
        imageurl:imageurl,
        price:price,
        description:description
    })
    .then(result=>{
        // console.log('Using Sequelize on postProducts result=>',result);
        console.log('Created Product');
        response.redirect('/admin/add-product');
    })
    .catch(err=>{
        console.log('Using sequelize on postProducts err =>',err);
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
    productClass.findByPk(fetchedId)
    .then(productPtr=>{
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
            .replace('<input type="url" name="imageurl" id="imageurl">',
                `<input type="url" name="imageurl" id="imageurl" value="${productPtr.imageurl||''}">`)
            .replace('<input type="number" name="price" id="price">',
                `<input type="number" name="price" id="price" value="${productPtr.price||''}">`)
            .replace('<textarea name="description" id="description" rows="5" cols="38"></textarea>',
                `<textarea name="description" id="description" rows="5" cols="38">${productPtr.description||''}</textarea>`)
            response.send(modifiedHtmlTemplete);
        });
    })
    .catch(err=>{
        console.log('edit products err =>',err);
    });
    //Method used before sequelize
    // productClass.findById(fetchedId,productPtr=>{
    //     if(!productPtr){
    //         console.log('Product not found');
    //         return response.redirect('/');
    //     }
    //     fs.readFile(path.join(rootDir,'Views','edit-product.html'),'utf-8',(error,templete)=>{
    //         if(error){
    //             console.log('Error reading templete:',error);
    //             return response.status(500).send('Server error');
    //         }
    //         const modifiedHtmlTemplete=templete
    //         .replace('<input type="hidden" name="id" id="id">',
    //             `<input type="hidden" name="id" id="id" value="${productPtr.id}">`)
    //         .replace('<input type="text" name="title" id="title">',
    //             `<input type="text" name="title" id="title" value="${productPtr.title||''}">`)
    //         .replace('<input type="url" name="image-url" id="image-url">',
    //             `<input type="url" name="image-url" id="image-url" value="${productPtr.imageUrl||''}">`)
    //         .replace('<input type="number" name="price" id="price">',
    //             `<input type="number" name="price" id="price" value="${productPtr.price||''}">`)
    //         .replace('<textarea name="description" id="description" rows="5" cols="38"></textarea>',
    //             `<textarea name="description" id="description" rows="5" cols="38">${productPtr.description||''}</textarea>`)
    //         response.send(modifiedHtmlTemplete);
    //     });
    // });
};
exports.postEditProducts=(request,response,next)=>
{
    console.log('Request Body =>',request.body);
    //Using sequelize
    productClass.findByPk(request.body.id)
    .then(updating=>{
        updating.id=request.body.id,
        updating.title=request.body.title,
        updating.imageurl=request.body.imageurl,
        updating.price=request.body.price,
        updating.description=request.body.description
        return updating.save();//This method will save the updated data in to the database
    })
    .then(()=>{
        console.log("Updated Products");
    })
    .catch(err=>{
        console.log('post edit products err=>',err);
    })
    //Method used before sequelize
    // const updatedProduct=new productClass({
    //     id:request.body.id,
    //     title:request.body.title,
    //     'image-url':request.body['image-url'],//The key for this need to match the one we are using in the contructor for example we using this['image-url'] as a key to value but when we a instance with the key something like imageurl or imageUrl this key is not mentioned in the constructor and this['image-url'] we have used gives as undefined which is why it is not displayed in the resultant json object when different key name are used for the instance creation
    //     price:request.body.price,
    //     description:request.body.description
    //     });
    //     console.log('Updated Product with Id =>',updatedProduct.id);
    // updatedProduct.save();
    response.redirect('/admin/product-list');
}

exports.postDeleteProducts=(request,response,next)=>
{
    const productId=request.body.deleteId;
    productClass.findByPk(productId)
    .then(fetchedProduct=>{
        return fetchedProduct.destroy();
    })
    .then(()=>{
        console.log('Product destructed successfully');
        response.redirect('/admin/product-list');
    })
    .catch(err=>{
        console.log('Destructing product error from postDeleteProducts =>',err);
    })
    //Method used before sequelize
    // productClass.deleteProductById(productId)
    // .then(()=>{
    //     response.redirect('/admin/product-list');
    // })
    // .catch((err)=>{
    //     response.status(500).send('Error deleting product');
    // })
};
