// When using sequelize,the below code will be automatically created by it and executed.We need to follow only the uncommanded lines
// const mysql=require('mysql2');
// const pool=mysql.createPool({
//     host:'localhost',
//     user:'root',
//     database:'node-complete',
//     password:'Qwertyuiop*789'
// });
// module.exports=pool.promise();
//Connecting to database using sequelize
const Sequelize=require('sequelize');
//The syntax for new Sequelize('database name',username,password);
const sequelize=new Sequelize('node-complete','root','Qwertyuiop*789',{
    dialect:'mysql',
    host:'localhost'
});
module.exports=sequelize;
