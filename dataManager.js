//导入mysql模块
const mysql = require('mysql');



//创建一个数据库连接

const connection = mysql.createConnection({
    host: '127.0.0.1', //数据库服务器的地址
    user:  'root',
    password :  'Plmmlp1994927',
    database: 'yellowData'
});


// 连接数据库
connection.connect();



module.exports = {

    //保存数据
    saveData(data,callback){
        let sqlStr = 'insert into yellow (img) values (?)';
        connection.query(sqlStr,[data],(err,results)=>{
            if(err) return callback(err);
            callback(null,results);
        })
    },


    getAlldata(callback){
        let sqlStr = 'select * from yellow';
        connection.query(sqlStr, (err,results)=>{
            if(err) return callback(err);
            callback(null,results);
        }) 
    }
}