//引用express框架
const express = require("express");
//创建网站服务器
const app = express();
//引入系统模块path,用来处理路径
const path = require("path");
//引入第三方模块bodyparser
const bodyParser = require("body-parser");
//导入express-session模块
const session = require("express-session");

//拦截所有的请求并交给use方法来处理
//配置session
app.use(session({ secret: "secret key" }));

//处理post请求参数
//extended:false，系统内部会用queryString去处理参数的格式
//extended:true,系统内部将会使用用一个叫qs的第三方模块去处理post请求参数
app.use(bodyParser.urlencoded({ extended: false }));

//数据库连接
require("./model/connect");
require("./model/user");

//告诉express框架模板所在的位置是什么
app.set("views", path.join(__dirname, "views"));
//告诉express框架模板的默认后缀是什么
app.set("view engine", "art");
//当渲染后缀为art的模板时，所使用的模板引擎是什么
app.engine("art", require("express-art-template"));

//开放静态资源文件
app.use(express.static(path.join(__dirname, "public")));

//导入路由模块
const home = require("./route/home");
const admin = require("./route/admin");

//拦截请求 判断用户
app.use("/admin", require("./middleware/loginGuard"));

//使用app.use()来拦截请求
//为路由匹配请求路径
app.use("/home", home);
app.use("/admin", admin);

//在路由处理的最后面，定义一个错误处理中间件
app.use((err, req, res, next) => {
  //为了代码写的更灵活，不能将跳转地址和错误信息写死在这
  //将字符串对象转换为对象类型
  const result = JSON.parse(err);
  console.log('result=',result);
  console.log('result.message=',result.message);
  res.redirect(`${result.path}?message=${result.message}`);

});
//监听端口
app.listen(80);
console.log("网站服务器启动成功，请访问localhost");