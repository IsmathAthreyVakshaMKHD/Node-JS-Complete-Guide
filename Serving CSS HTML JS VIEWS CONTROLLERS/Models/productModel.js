const sequelizeOrm=require('sequelize');
const sequelizeDb=require('../utilPath/database');
const productDefinition=sequelizeDb.define('productDB',
{
    id:{
        type:sequelizeOrm.INTEGER,
        autoincrement:false,
        allowNull:false,
        primaryKey:true
    },
    title:sequelizeOrm.STRING,
    imageurl:{
        type:sequelizeOrm.STRING,
        allowNull:false
    },
    price:{
        type:sequelizeOrm.INTEGER,
        allowNull:false
    },
    description:{
        type:sequelizeOrm.STRING,
        allowNull:false
    }
});
module.exports=productDefinition;
