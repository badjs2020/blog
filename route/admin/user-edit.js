module.exports= (req, res) => {
  const {message}=req.query;
  //我们不希望在render里面写绝对路径的，所以我们需要在app.js下做两项配置
  res.render("admin/user-edit",{
    message:message
  });
}