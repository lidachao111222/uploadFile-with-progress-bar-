const Formidable = require('formidable');
const dataManager = require('./dataManager')



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
                    data:err
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
        res.render('index.ejs', {})
    },

    //展示图片
    showImg(req, res) {

        //展示图片
        //调用数据库，把图片路径存到数据库里面
        dataManager.getAlldata((err, data) => {
            if (err) return console.log(err);
            console.log(data);

            //展示数据
            res.render('show.ejs', {data:data})
        });


    },


    //展示详情
    showDetail(req,res){
        res.render('detail.ejs',{} )
    }

}