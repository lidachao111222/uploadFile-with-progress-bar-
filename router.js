// 引入模块
const express = require('express');


// 注册对象
let router = express.Router();


router.get('/',(req,res)=>{
    res.render('index.ejs',{})
})










//暴露接口
module.exports = router;