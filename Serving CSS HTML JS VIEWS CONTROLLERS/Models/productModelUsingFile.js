// //Model 2
// const fs=require('fs');
// const path=require('path');
// const p=path.join(path.dirname(require.main.filename),'Data','productList.json');//Second argument is folder name & Third argument is filename with type
// const getProductsFromFile=callback=>{
//   fs.readFile(p,(err,fileContent)=>{
//     if(err||fileContent.length<0){
//       return callback([]);
//     }
//     else{
//       return callback(JSON.parse(fileContent));
//     }
//   })
// }
// module.exports=class Product{
//     constructor(item){//The resultant json objects will hold the same keys name as defined in the constructor
//       this.id=item.id;
//       this.title=item.title;
//       this.imageUrl=item['image-url'];/*Brackets are required for hyphenated names and it is called Dynamic Key Access*/
//       this.price=item.price;
//       this.description=item.description;
//     }
//     save(){
//       getProductsFromFile(dataArr=>{
//         // console.log('Current product ID:', this.id);
//         // console.log('Existing products:', dataArr);
//         if(this.id){//Edit Mode
//           const existingProductIndex=dataArr.findIndex(prod=> {
//             // console.log('Comparing:', prod.id, this.id); // Debug log
//             return prod.id===this.id;
//           });
//           // console.log('Found product at index:', existingProductIndex); // Debug log
//           const updatedProductsArr=[...dataArr];
//           updatedProductsArr[existingProductIndex]=this;
//           fs.writeFile(p,JSON.stringify(updatedProductsArr),err=>{
//             console.log("Error saving updated product =>", err);
//           });
//         }
//         else{//Add Mode
//           this.id=Math.random().toString();
//           dataArr.push(this);
//           fs.writeFile(p,JSON.stringify(dataArr),err=>{
//             console.log("Error adding new product =>", err);
//           });
//         }
//       })
//       //Above code is a refracted version of the below code which involes adding a anonymous function 
//         // fs.readFile(p,(err,fileContent)=>{
//         //     let dataArr=[];
//         //     if(!err&&fileContent.length>0){
//         //         try{
//         //             dataArr=JSON.parse(fileContent);
//         //         }
//         //         catch(parseError){
//         //             console.error('Error parsing JSON : '+parseError);
//         //         }
//         //     }
//         //     dataArr.push(this);
//         //     fs.writeFile(p,JSON.stringify(dataArr),err=>{
//         //         console.log("Error =>"+err);
//         //     });
//         // })
//     }
//     static fetchAll(callback){
//       getProductsFromFile(callback);
//       //Above code is refracted version of the below code
//         // fs.readFile(p,(err,fileContent)=>{
//         //     if(err){
//         //         return callback([]);
//         //     }
//         //     if(fileContent.length===0){
//         //         return callback([]);
//         //     }
//             // try{
//                 // const currentList=JSON.parse(fileContent);
//                 // callback(currentList);
//             // }
//             // catch(parseError){
//             //     console.error('Error parsing json : '+parseError);
//             //     callback([]);
//             // }
//         // })
//     }
//     static findById(id,callback){
//       getProductsFromFile(productListing=>{
//         const foundProduct=productListing.find(listing=> listing.id===id);
//         callback(foundProduct);
//       })
//     }
//     static deleteProductById(id,callback){
//       getProductsFromFile(products=>{
//         const updatedProducts=products.filter(prod => prod.id!==id);
//         fs.writeFile(p,JSON.stringify(updatedProducts),err=>{
//           if(err){
//             console.log('Error deleting product =>',err);
//             callback(false);
//           }
//           else{
//             callback(true);
//           }
//         });
//       });
//     }
// }
// //Own logic
// // const fs=require('fs');
// // //const productArr=[];
// // module.exports=class Product{
// //     constructor(item)
// //     {
// //         this.title=item;
// //     }
// //     save()
// //     {
// //         //Using array for storage
// //         //productArr.push(this);
// //         //Using file for storage
// //         if(fs.stat('storedProduct.txt',(err)=>
// //         {
// //             if(err&&err.code==='ENOENT')
// //             {
// //                 fs.writeFile('storedProduct.txt',this.title,(writeErr)=>
// //                 {
// //                     if(writeErr) throw writeErr;
// //                 });   
// //             }
// //             else
// //             {
// //                 fs.appendFile('storedProduct.txt',`\n${this.title}`,(appendErr)=>
// //                 {
// //                     if(appendErr) throw appendErr;
// //                 });
// //             }  
// //         }
// //         ));
// //     }
// //     static fetchAll(callback)
// //     {
// //         //Using array for fetching
// //         //return productArr;
// //         //Using file for fetching
// //         if(fs.stat('storedProduct.txt',(err)=>
// //         {
// //             if(err&&err.code==='ENOENT')
// //             {
// //                 callback('');
// //             }
// //             else
// //             {
// //                 fs.readFile('storedProduct.txt','utf-8',(readError,data)=>
// //                 {
// //                     if(readError) throw readError;

// //                     callback(data);
// //                 });
// //             }
// //         }
// //         ));
// //     }
// // }
// //Model 3
// // const fs = require('fs');
// // const path = require('path');
// // const p = path.join(path.dirname(require.main.filename),'data','products.json');
// // const getProductsFromFile=cb=>{
// //     fs.readFile(p, (err, fileContent) => {
// //         if (err) {
// //             cb([]); 
// //         }
// //         else{
// //             cb(JSON.parse(fileContent));
// //         }
// //       });
// // }
// // module.exports = class Product {
// //   constructor(t) {
// //     this.title = t;
// //   }

// //   save() {
// //     // fs.readFile(p, (err, fileContent) => {
// //     //   let products = [];
// //     //   if (!err) {
// //     //     products = JSON.parse(fileContent);
// //     //   }
// //     //   products.push(this);
// //     //   fs.writeFile(p, JSON.stringify(products), err => {
// //     //     console.log(err);
// //     //   });
// //     // });
// //     getProductsFromFile(products=>{
// //         products.push(this);
// //         fs.writeFile(p,JSON.stringify(products),err=>{
// //             console.log(err);
// //         })
// //     })
// //   }

// //   static fetchAll(cb) {
// //     // fs.readFile(p, (err, fileContent) => {
// //     //   if (err) {
// //     //    return cb([]); //If the return is removed this will result in error because the fetchAll() will triggered from get request everytime and when you are loading it for the first time the program follow will reach the second callback() while file content would be created but it is undefined
// //     //   }
// //     //   cb(JSON.parse(fileContent));
// //     // });
// //     getProductsFromFile(cb);
// //   }
// // };