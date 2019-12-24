//引入模块
const express = require('express');
const router = require('./router')
const bodypParser = require('body-parser');
const http = require('http');

//创建服务器
const app = express();

//监听端口
app.listen(3000,()=>{
    console.log('server is running at http://127.0.0.1:3000')
})

//设定模板
app.set('view engine','ejs');


app.set('trust proxy', true);// 设置以后，req.ips是ip数组；如果未经过代理，则为[]. 若不设置，则req.ips恒为[]


//设定静态文件托管
app.use('/node_modules',express.static('node_modules'));

app.use(express.static('views/img'));

app.use('/my/dir/',express.static('my/dir'))

app.use(bodypParser.urlencoded({
    extended: false, 
    limit:    2*1024*1024
}))



//注册请求事件
app.use(router);