const path=require('path');
const rootDir=require('../utilPath/pathFile');
exports.getError=(request,response,next)=>
{
    response.status(404).sendFile(path.join(rootDir,'Views','404.html'));
}