// 引入模块
const express = require('express');
const controller = require('./controller');

// 注册对象
let router = express.Router();


router.get('/',(req,res)=>{
    res.render('index.ejs',{})
}).post('/addPic',(req,res)=>{
    controller.uploadImg(req,res);
})










//暴露接口
module.exports = router;