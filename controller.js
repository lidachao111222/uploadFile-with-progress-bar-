const Formidable = require('formidable');
const dataManager = require('./dataManager')
const path = require('path');
const urlModel = require('url');
const queryString = require('querystring');


module.exports = {
    //上传
    uploadImg(req, res) {

        // 创建一个接受文件对象
        const form = new Formidable();

        form.encoding = 'utf-8';

        form.uploadDir = "./my/dir"; //为什么需要使用绝对路径？？？？？ 而不是上课的时候的相对路径  会了，要加点

        // /Users/lichao/Desktop/uploadFile-with-progress-bar-/my/dir
        //设定上传最大值  2G
        form.maxFileSize = 20000 * 1024 * 1024;

        //改为不是二进制的，图片格式
        form.keepExtensions = true;


        form.parse(req, (err, fields, files) => {
            // if (err) return res.json({
            //     code: 201,
            //     message: '上传失败'
            // });

            // res.json({
            //     code: 200,
            //     message: '上传成功',
            //     // data: files.imgSend.path

            // })

            //得到的文件路径名字
            // console.log(files.imgSend.path);


            //存到数据库里面  上面成功与否就不需要写了，直接数据库feedback
            dataManager.saveData(files.imgSend.path, (err, data) => {
                if (err) return res.json({
                    code: 201,
                    message: '上传失败',
                    data: err
                });
                res.json({
                    code: 200,
                    message: '上传成功',
                    data: data
                })
            });



        });
    },


    //展示首页
    showIndex(req, res) {


        dataManager.getFeedback((results) =>{
            if(results === 'err') return console.log(err);

            // console.log(results);
            res.render('index.ejs', {data:results})
        });
        


     
    },

    //展示图片
    showImg(req, res) {

        //展示图片
        //调用数据库，把图片路径存到数据库里面
        dataManager.getAlldata((err, data) => {
            if (err) return console.log(err);
            // console.log(data);

            //展示数据
            res.render('show.ejs', {
                data: data
            })
        });


    },


    //展示详情
    showDetail(req, res) {
        res.render('detail.ejs', {})
    },

    //传回json格式值
    getDetail(req, res) {
        let {
            id
        } = req.query;
        // console.log(id)
        dataManager.getDetail(id, (err, data) => {
            if (err) res.json({
                code: 201,
                msg: '接收数据失败',
                data: err
            });
            res.json({
                code: 200,
                msg: '接收数据成功',
                data: data
            })
        });
    },



    //留下信息
    leaveFeedback(req, res) {

        let {
            data
        } = req.body;


        //get ip 
        var ip = req.headers['x-forwarded-for'] ||
            req.ip ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress || '';
        if (ip.split(',').length > 0) {
            ip = ip.split(',')[0]
        }
 

        // console.log(data);
        // console.log(ip);

        ip = ip.substring(7);
        
        dataManager.saveFeedback(ip,data,(mes,ip,data)=>{
            if(mes == true){
                res.json({
                    code: 201,
                    mes:'上传失败'
                })
            }
            res.json({
                code: 200,
                mes:'上传成功',
                ip: ip,
                data: data
            })
        })
    }

}