//引入User集合的构造函数
const { User, validateUser } = require("../../model/user");
//引入密码加密模块
const bcrypt = require("bcryptjs");
module.exports = async (req, res,next) => {
  try {
    await validateUser(req.body);
  } catch (e) {
    //验证没有通过，显示错误信息
    //e.message
    //重定向回用户添加页面
    // res.redirect(`/admin/user-edit?message=${e.message}`);
    //next方法只能传递一个参数，且这个参数的类型只能是字符串类型
    //但是我们要传递的一个对象
    //JSON.stringify() 将对象数据类型转换为字符串数据类型
    //调用next方法就会触发app.js的错误处理中间件
    return next(JSON.stringify({ path: "/admin/user-edit", message: e.message }));
  }

  //根据邮箱地址查询用户是否存在
  //如果不存在，返回值为空，user为空
  let user = await User.findOne({ email: req.body.email });
  if (user != null) {
    //这行代码会有一个end方法，所以不要再向下执行了
    // return res.redirect(`/admin/user-edit?message=邮箱地址已经被占用了`);
    return next(JSON.stringify({path:'/admin/user-edit',message:'邮箱地址已经被占用'}))
  }
  //对密码进行加密处理
  //生成随机字符串
  const salt = await bcrypt.genSalt(10);
  //加密
  const password = await bcrypt.hash(req.body.password, salt);
  //替换密码
  req.body.password = password;
  // res.send(req.body);
  //将用户信息添加到数据库中
  await User.create(req.body);
  //重定向回用户页面
  //将页面重定向会用户列表页面
  res.redirect("/admin/user");
};
