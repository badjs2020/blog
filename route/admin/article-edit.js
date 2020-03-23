const { Article } = require("../../model/article");
module.exports = async (req, res) => {
  //获取到地址栏中的id参数
  const { message, id } = req.query;
  //如果当前传递了id参数
  if (id) {
    //修改操作
    let article = await Article.findOne({ _id: id }).populate('author');
    console.log(article);
    
    // res.send(article);
    // return;
    res.render("admin/article-edit", {
      message: message,
      //将用户信息传递到我们的模板界面当中
      article: article,
      link: "/admin/article-modify?id="+id,
      button:'修改'
    });
  } else {
    //添加操作
    //我们不希望在render里面写绝对路径的，所以我们需要在app.js下做两项配置
    res.render("admin/article-edit", {
      message: message,
      link: "/admin/article-edit",
      button:'添加'
    });
  }
};
