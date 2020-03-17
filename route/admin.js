const express = require("express");
//创建博客展示页面路由
const admin = express.Router();

//渲染登录页面
admin.get("/login",require('./admin/loginPage'));
//实现登录功能
admin.post("/login", require('./admin/login'));
//创建用户列表路由
admin.get('/user',require("./admin/userPage"))
//实现退出功能
admin.get('/logout',require("./admin/logout"))
//创建用户编辑页面路由
admin.get("/user-edit",require('./admin/user-edit'));
//创建用户添加功能路由
admin.post("/user-edit",require('./admin/user-edit-fn'));

admin.get("/article", (req, res) => {
  //我们不希望在render里面写绝对路径的，所以我们需要在app.js下做两项配置
  res.render("admin/article");
});
admin.get("/article-edit", (req, res) => {
  //我们不希望在render里面写绝对路径的，所以我们需要在app.js下做两项配置
  res.render("admin/article-edit");
});

//将路由对象作为模块进行导出
module.exports = admin;
