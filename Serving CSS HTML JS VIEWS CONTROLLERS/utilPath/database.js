const mysql=require('mysql2');
const pool=mysql.createPool({
    host:'localhost',
    user:'root',
    database:'node-complete',
    password:'Qwertyuiop*789'
});
module.exports=pool.promise();
