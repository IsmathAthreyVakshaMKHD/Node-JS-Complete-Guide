const path=require('path');
//module.exports=path.dirname(process.mainModule.filename); 
//--> The mainModule is deprecated the alternative is used below
module.exports=path.dirname(require.main.filename);