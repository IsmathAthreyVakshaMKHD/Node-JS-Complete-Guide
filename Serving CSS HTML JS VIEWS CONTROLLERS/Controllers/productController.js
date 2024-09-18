const path=require('path');
const rootDir=require('../utilPath/pathFile');
exports.getProducts=(request,response,next)=>
{
    response.sendFile(path.join(rootDir,'Views','add-product.html'));
}
exports.postProducts=(request,response,next)=>
{
    console.log(request.body);
    response.redirect('/');
}