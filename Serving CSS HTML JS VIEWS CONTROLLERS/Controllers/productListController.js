const path=require('path');
const rootDir=require('../utilPath/pathFile');
const fs=require('fs');
// const productListClass=require('../Models/productListModel');
const productClass=require('../Models/productModel');
exports.getProductLists=((request,response,next)=>
{
    productClass.fetchAll((fetchedProducts)=>{
        fs.readFile(path.join(rootDir,'Views','productList.html'),'utf-8',(error,template)=>{
            if(error){
                console.log('Error reading templete =>',error);
                return response.status(500).send('Server Error');
            }
            let productListHtml='';
            fetchedProducts.forEach(currentProduct=>{
                productListHtml+=`
                <div class="product">
                    <h2>${currentProduct.title}</h2>
                    <img src="${currentProduct.imageUrl}" alt="${currentProduct.title}">
                    <p>Price: $${currentProduct.price}</p>
                    <p>${currentProduct.description}</p>
                    <a href="/admin/product-list/${currentProduct.id}" class="btn" type="submit">Details</a>
                    <form action="/admin/add-to-cart" method="POST">
                    <button class="btn">Add to Cart</button>
                </div>
                `;
            })
            const fullProductListHtml=template.replace('<!-- PRODUCTS_PLACEHOLDER -->',productListHtml);
            response.send(fullProductListHtml);
        })
        // response.sendFile(path.join(rootDir,'Views','productList.html'));    
    })
})
exports.getProductId=((request,response,next)=>
{
    const currentProductId=request.params.productId;
    //console.log(currentProductId);
    productClass.findById(currentProductId,receivedProduct=>{
        if(!receivedProduct){
            response.status(404).send('Product not found');
        }
        fs.readFile(path.join(rootDir,'Views','productDetails.html'),'utf-8',(error,template)=>{
            if(error){
                console.log('Error Reading temnplate =>',error);
                response.status(500).send('Server Error 2');
            }
            let productDetailsHtml=`
            <h1>${receivedProduct.title}<h1>
            <hr>
            <img src="${receivedProduct.imageUrl}" alt="${receivedProduct.title}">
            <p>$${receivedProduct.price}</p>
            <p>${receivedProduct.description}</p>
            <form action="add-to-cart" method="POST">
            <button type="submit">Add to Cart</button>
            </form>
            `;
            const fullProductDetailsHtml=template.replace('<!-- PRODUCT_DETAILS_PLACEHOLDER -->',productDetailsHtml);
            response.send(fullProductDetailsHtml);
        })
        console.log(receivedProduct);
    })
    //response.redirect('/');
})