//导入文章集合构造函数
const { Article } = require("../../model/article");
//导入评论集合构造函数
const {Comment}=require("../../model/comment")
module.exports = async (req, res) => {
  //接收客户端传递过来的Id值
  const id = req.query.id;
  //根据id查询文章详细信息
  let article = await Article.findOne({ _id: id }).populate('author');
  //查询当前文章对应的评论信息
  let comments=await Comment.find({aid:id}).populate('uid');
  // res.send(comments);
  // return;
  // res.send(article)
  // res.send("文章界面")
  //在article.art中可以使用article了
  res.render("home/article.art",{
    article:article,
    comments:comments
  });
};
