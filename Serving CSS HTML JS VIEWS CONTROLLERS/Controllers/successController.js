const path=require('path');
const rootDir=require('../utilPath/pathFile');
exports.postSuccess=(request,response,next)=>
{
    response.redirect('/admin/success');
}
exports.getSuccess=(request,response,next)=>
{
    response.sendFile(path.join(rootDir,'Views','success.html'));
}