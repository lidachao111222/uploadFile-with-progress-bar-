// 引入模块
const express = require('express');
const controller = require('./controller');
const path = require('path');
const urlModel = require('url');
const bodypParser = require('body-parser');


// 注册对象
var router = express.Router()


router.get('/',(req,res)=>{
    controller.showIndex(req,res)
}).post('/addPic',(req,res)=>{
    controller.uploadImg(req,res);
}).get('/show',(req,res)=>{
    controller.showImg(req,res);
})




//暴露接口
module.exports = router;