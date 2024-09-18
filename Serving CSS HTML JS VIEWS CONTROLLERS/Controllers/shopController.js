const path=require('path');
const rootDir=require('../utilPath/pathFile');
exports.getShop=(request,response,next)=>
{
    response.sendFile(path.join(rootDir,'Views','shop.html'));
}