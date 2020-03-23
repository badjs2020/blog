//导入用户集合构造函数
const { User } = require("../../model/user");

module.exports = async (req, res) => {
  //标识 表示当前访问的是用户管理页面
  req.app.locals.currentLink='user';
  //接收客户端传递过来的当前页参数 分页28集
  let page = req.query.page || 1;
  //每一页显示的数据条数
  let pagesize = 5;
  //查询用户数据的总数
  let count = await User.countDocuments({});
  //总页数,进1
  let total = Math.ceil(count / pagesize);
  //页面对应的数据查询开始位置
  let start = (page - 1) * pagesize;
  //将用户信息从数据库查询出来
  //查询出来的是一个数组
  // [{"state":0,"_id":"5e6df126444d0657f8da448e","username":"hzw","email":"Hziwen1998@163.com","password":"$2a$10$g9St0Ez5Gdtwn0DkS8wBWe1Gu5O.cd6cgJBbaNvEdQHGBUjeqPOd6","role":"admin","__v":0},{"state":0,"_id":"5e6e5e838f9bd3266861c9ba","username":"张三","email":"zs@qq.com","password":"$2a$10$oTqULvIPsfZ4fzXivWZhnONP3srhud5Mm6BkpUzJUtTto/xwhJxRy","role":"normal","__v":0},{"state":0,"_id":"5e6efca401ebea1508aa42cc","username":"184908","email":"123@163.com","password":"$2a$10$EOtH/6j/EeJJtXzE1ltd2uflzk1YHS2Zxnfd7uoea4CFRG4Wac34W","role":"normal","__v":0}]
  // res.send(users);
  let users = await User.find({})
    .limit(pagesize)
    .skip(start);

  //渲染用户列表模块
  res.render("admin/user", {
    users:users,
    page:page,
    total:total
  });
  // res.send("总页数"+total);

  // console.log('req.session.username=',req.session.username);
  // res.render('admin/user')
};
