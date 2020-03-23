//将文章集合的构造函数导入到当前文件中
const { Article } = require("../../model/article");
//导入mongoose-sex-page模块
const pagination = require("mongoose-sex-page");

module.exports = async (req, res) => {
  //接收客户端传递过来的页码
  const page=req.query.page;
  // //标识 标识当前访问的是用户管理页面
  req.app.locals.currentLink = "article";
  //查询所有文章数据，进行多集合的联合查询，找出作者
  // page方法表示指定当前页;
  // size方法指定每页显示的数据条数;
  // display指定客户端要显示的页码数量;
  //exec是向数据库中发出查询请求
  const articles = await pagination(Article)
    .find()
    .page(page)
    .size(5)
    .display(3)
    .populate("author")
    .exec();
    // res.send(articles);
    // return;
  // const articles=await Article.find().populate('author')
  // res.send(articles);
  //我们不希望在render里面写绝对路径的，所以我们需要在app.js下做两项配置
  res.render("admin/article", {
    //然后我们就可以在模板当中循环我们的article数组了
    articles: articles
  });
};
