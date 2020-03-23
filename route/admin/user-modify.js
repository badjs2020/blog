const { User } = require("../../model/user");
const bcrypt = require("bcryptjs");
module.exports = async (req, res, next) => {
  //接收客户端传递过来的请求参数
  const reqBody = req.body;
  const { username, email, role, state, password } = req.body;
  //即将要修改的用户id
  const id = req.query.id;
  //查询对应id号的用户
  let user = await User.findOne({ _id: id });
  // res.send(user);
  //密码比对
  const isValid = await bcrypt.compare(password, user.password);
  //如果isValid为真则比对成功
  if (isValid) {
    console.log('密码比对成功,username=',username);
    
    // res.send("密码比对成功");
    //将用户信息更新到数据库中
    await User.updateOne(
      { _id: id },
      {
        username: username,
        email: email,
        role: role,
        state: state
      }
    );
    //进行页面重定向
    res.redirect('/admin/user')
  } else {
    let obj = {
      path: "/admin/user-edit",
      message: "密码比对失败，不能进行用户信息的修改",
      id: id
    };
    //跳到app.js的错误处理中间件
    next(JSON.stringify(obj));
  }
};
