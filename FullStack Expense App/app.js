const path=require('path');
const rootDir=require('./utilPath/pathFile');
const express=require('express');
const app=express();
const sequelizeDb=require("./utilPath/database");
const bodyParser=require("body-parser");
const adminRouter=require("./Routes/admin");
// app.use(express.static(path.join(rootDir,'public')));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/admin/',adminRouter);
sequelizeDb.sync()
.then(()=>{
    app.listen(3000);
})
.catch(err=>{
    console.log("Sequelize sync error",err);
});