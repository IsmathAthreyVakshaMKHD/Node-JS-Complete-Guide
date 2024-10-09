const fs=require('fs');
const path=require('path');
const p=path.join(path.dirname(require.main.filename),'Data','cartList.json');
module.exports=class Cart{
    static addProduct(currentId,currentPrice){
        fs.readFile(p,(err,fileContent)=>{
            let cartData={productData:[],totalPrice:0};
            if(!err){
                cartData=JSON.parse(fileContent);
            }
            let existingProductDataIndex=cartData.productData.findIndex(currProduct=>currProduct.id===currentId);
            let existingProductData=cartData.productData[existingProductDataIndex];
            let updatedProductData;
            if(existingProductData){
                updatedProductData={...existingProductData};
                updatedProductData.quantity=updatedProductData.quantity+1;
                cartData.productData=[...cartData.productData];
                cartData.productData[existingProductDataIndex]=updatedProductData;
            }
            else{
                updatedProductData={id:currentId,quantity:1};
                cartData.productData=[...cartData.productData,updatedProductData]; //Use [] when dealing with array and use {} when dealing with objects when the vice versa is done i.e when {} is used when dealing with arrays the name of the array varaible which is used for just the reference will be treated as key and it will be added to the results causing unwanted keys and any arrays methods in the library can't be used when attempting to access that method it will throw an unable to find method error
            }
            cartData.totalPrice=cartData.totalPrice+ +currentPrice;
            fs.writeFile(p,JSON.stringify(cartData),(err)=>{
                console.log('Cart write error =>',err);
            })
        })
    }
}

//Exactly as Academind
// const fs=require('fs');
// const path=require('path');
// const p=path.join(path.dirname(require.main.filename),'Data','cart.json');
// module.exports=class Cart{
//     static addProduct(Id,productPrice){
//         fs.readFile(p,(err,fileContent)=>{
//             let cart={products:[],totalPrice:0};
//             if(!err){
//                 cart=JSON.parse(fileContent);
//             }
//             const existingProductIndex=cart.products.findIndex(prod=>prod.id===Id);
//             const existingProduct=cart.products[existingProductIndex];
//             let updatedProduct;
//             if(existingProduct){
//                 updatedProduct={...existingProduct};
//                 updatedProduct.qty=updatedProduct.qty+1;
//                 cart.products=[...cart.products];
//                 cart.products[existingProductIndex]=updatedProduct;
//             }
//             else{
//                 updatedProduct={id:Id,qty:1};
//                 cart.products=[...cart.products,updatedProduct];
//             }
//             cart.totalPrice=cart.totalPrice+ +productPrice;
//             fs.writeFile(p,JSON.stringify(cart),(err)=>{
//                 console.log('Cart write error =>',err);
//             })
//         })
//     }
// }