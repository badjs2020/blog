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

//导入art-template模板引擎
const template=require('art-template');
//导入dateformat第三方模块,它的返回值其实是一个方法
//调用这个方法就可以对日期进行处理
const dateFormat=require('dateformat');

//引入morgan模块,将客户端到服务器端发送的请求信息打印到控制台当中
//它其实也是express框架的一个中间件函数
const morgan=require('morgan')
//导入config模块
const config=require('config')

//拦截所有的请求并交给use方法来处理
//配置session
app.use(session({ secret: "secret key" }));

//处理post请求参数
//extended:false，系统内部会用queryString去处理参数的格式,可以使用req.body去获得请求内容
//extended:true,系统内部将会使用用一个叫qs的第三方模块去处理post请求参数
//只能处理普通表单传递过来的参数，不能处理表单传递过来的二进制数据
app.use(bodyParser.urlencoded({ extended: false }));

//接收客户端传递过来的二进制数据
//作用:解析表单，支持get请求参数，post请求参数，文件上传


//数据库连接
require("./model/connect");
require("./model/user");
require("./model/article")

//告诉express框架模板所在的位置是什么
app.set("views", path.join(__dirname, "views"));
//告诉express框架模板的默认后缀是什么
app.set("view engine", "art");
//当渲染后缀为art的模板时，所使用的模板引擎是什么
app.engine("art", require("express-art-template"));
//向模板内部导入dateFormate变量
template.defaults.imports.dateFormat=dateFormat;
//开放静态资源文件
app.use(express.static(path.join(__dirname, "public")));


//获取title
console.log(config.get('title'));

//获取系统环境变量 返回值是对象
// console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV=='development'){
  //当前是开发环境
  console.log('当前是开发环境');
  //在开发环境中，将客户端发送到服务器端的请求信息打印到控制台当中
  app.use(morgan('dev'))
}else{
  //当前是生产环境
  console.log('当前是生产环境');
}

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
  console.log("result=", result);
  console.log("result.message=", result.message);
  //改善代码
  // 当前这个result就是传过来的{path:'/admin/user-edit',message:'密码比对失败，不能进行用户信息的修改',id:id}
  let params = [];
  for (let attr in result) {
    if (attr != "path") {
      params.push(attr + "=" + result[attr]);
    }
  }
  console.log(params.join('&'));
  
  // res.redirect(`${result.path}?message=${result.message}`);
  res.redirect(`${result.path}?${params.join('&')}`)
});
//监听端口
app.listen(80);
console.log("网站服务器启动成功，请访问localhost");
