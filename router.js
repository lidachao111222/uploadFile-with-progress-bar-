// 引入模块
const express = require('express');
const controller = require('./controller');
const path = require('path');
const urlModel = require('url');
const bodypParser = require('body-parser');

// 注册对象
var router = express.Router()


router.get('/',(req,res)=>{
    res.render('index.ejs',{})
})




//暴露接口
module.exports = router;