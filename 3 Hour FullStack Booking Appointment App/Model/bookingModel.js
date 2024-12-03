const sequelizeOrm=require('sequelize');
const sequelizeDb=require('../utilPath/database');
const bookingDefinition=sequelizeDb.define('user',
    {
        id:{
            type:sequelizeOrm.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        username:{
            type:sequelizeOrm.STRING,
            allowNull:false
        },
        phonenumber:{
            type:sequelizeOrm.STRING,
            allowNull:false
        },
        emailid:{
            type:sequelizeOrm.STRING,
            allowNull:false
        }
});
module.exports=bookingDefinition;