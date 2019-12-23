const Formidable = require('formidable');




module.exports={
    //上传
    uploadImg(req,res){

        // 创建一个接受文件对象
        const form = new Formidable();

        form.encoding = 'utf-8';

        form.uploadDir = "./my/dir";  //为什么需要使用绝对路径？？？？？ 而不是上课的时候的相对路径  会了，要加点

        // /Users/lichao/Desktop/uploadFile-with-progress-bar-/my/dir
        //设定上传最大值  2G
        form.maxFileSize = 20000 * 1024 * 1024;

        //改为不是二进制的，图片格式
        form.keepExtensions = true;


        form.parse(req, (err, fields, files) => {
            if (err) res.json({
                code:201,
                message:'上传失败'
            });

            //得到的文件路径名字
            console.log(files.imgSend.path);

            //调用数据库，把图片路径存到数据库里面

            res.json({
                code:200,
                message:'上传成功',
                data: files.imgSend.path
            })
          });
    },


    //展示首页
    showIndex(req,res){
        res.render('index.ejs',{})
    },

    //展示图片
    showImg(req,res){

        //展示图片

        res.render('show.ejs',{})
    }

}
