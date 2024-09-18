const path=require('path');
const rootDir=require('../utilPath/pathFile');
exports.getContactus=(request,response,next)=>
{
    response.sendFile(path.join(rootDir,'Views','contactus.html'));
}