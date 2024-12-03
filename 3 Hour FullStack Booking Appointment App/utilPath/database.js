const Sequelize=require('sequelize');
const sequelize=new Sequelize('node-complete','root','Qwertyuiop*789',{
    dialect:'mysql',
    host:'localhost'
});
module.exports=sequelize;