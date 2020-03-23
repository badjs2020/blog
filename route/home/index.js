const {Article}=require("../../model/article");
//导入分页模块
const pagination= require('mongoose-sex-page')
//博客前台首页的请求处理函数
module.exports = async (req, res) => {
  //获取页码值
  const page=req.query.page;
  //从数据库中查询数据
  let result=await pagination(Article).page(page).size(4).display(5).find().populate('author').exec();
  // res.send(result)
  // return;
  //渲染模板并传递数据
  res.render("home/default.art",{
    result:result
  });
};
