//导入formidable第三方模块
const formidable = require("formidable");
const path = require("path");
//包括了文章集合构造函数
const { Article } = require("../../model/article");

module.exports = (req, res) => {
  //1、创建表单解析对象
  const form = new formidable.IncomingForm();
  //2、配置上传文件的存放位置
  //__dirname:route/admin文件夹
  form.uploadDir = path.join(__dirname, "../", "../", "public", "uploads");
  //3、保留上传文件的后缀,默认是false是不保留
  form.keepExtensions = true;
  //4、解析表单,这个表单从客户端来，所以从req中拿
  form.parse(req, async (err, fields, files) => {
    //1、err错误对象，如果表单解析失败，err里面存储错误信息
    //如果表单解析成功，则err的值为null
    //2、fields 对象类型，保存普通表单数据
    //3、files 对象类型，保存了和上传文件相关的数据
    // res.send(files);
    //对files中的内容进行切割
    // res.send(files.cover.path.split("public")[1]);
    await Article.create({
      title:fields.title,
      author:fields.author,
      publishDate:fields.publishDate,
      cover:files.cover.path.split('public')[1],
      content:fields.content,
    });
  });
  //将页面重定向到文章列表页面
  res.redirect('/admin/article')
  // res.send('ok');
};
