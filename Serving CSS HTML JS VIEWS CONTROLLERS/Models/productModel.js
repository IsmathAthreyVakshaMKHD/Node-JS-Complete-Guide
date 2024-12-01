const sequelizeOrm=require('sequelize');
const sequelizeDb=require('../utilPath/database');
const productDefinition=sequelizeDb.define('productDB',
{
    id:{
        type:sequelizeOrm.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    title:{
        type:sequelizeOrm.STRING,
        allowNull:false
    },    
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
