//导入用户集合构造函数
const {User}=require('../../model/user')

module.exports=async (req,res)=>{
  //接收客户端传递过来的当前页参数
  let page= req.query.page;
  res.send(page);
  return ;
  // console.log('req.session.username=',req.session.username);
  // res.render('admin/user')
  //将用户信息从数据库查询出来
  //查询出来的是一个数组
  let users=await User.find({});
  // [{"state":0,"_id":"5e6df126444d0657f8da448e","username":"hzw","email":"Hziwen1998@163.com","password":"$2a$10$g9St0Ez5Gdtwn0DkS8wBWe1Gu5O.cd6cgJBbaNvEdQHGBUjeqPOd6","role":"admin","__v":0},{"state":0,"_id":"5e6e5e838f9bd3266861c9ba","username":"张三","email":"zs@qq.com","password":"$2a$10$oTqULvIPsfZ4fzXivWZhnONP3srhud5Mm6BkpUzJUtTto/xwhJxRy","role":"normal","__v":0},{"state":0,"_id":"5e6efca401ebea1508aa42cc","username":"184908","email":"123@163.com","password":"$2a$10$EOtH/6j/EeJJtXzE1ltd2uflzk1YHS2Zxnfd7uoea4CFRG4Wac34W","role":"normal","__v":0}]
  // res.send(users);
  res.render('admin/user',{
     users:users
 })
}