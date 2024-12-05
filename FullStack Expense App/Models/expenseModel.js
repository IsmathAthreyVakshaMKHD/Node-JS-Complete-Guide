const sequelizeOrm=require('sequelize');
const sequelizeDb=require('../utilPath/database');
const expenseDefinition=sequelizeDb.define('expense',
    {
        id:{
            type:sequelizeOrm.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        chooseExpenseAmount:{
            type:sequelizeOrm.INTEGER,
            allowNull:false
        },
        chooseDescription:{
            type:sequelizeOrm.STRING,
            allowNUll:false
        },
        chooseACategory:{
            type:sequelizeOrm.STRING,
            allowNull:false
        }
})
module.exports=expenseDefinition;