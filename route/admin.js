const express = require("express");
//创建博客展示页面路由
const admin = express.Router();

//渲染登录页面
admin.get("/login", require("./admin/loginPage"));
//实现登录功能
admin.post("/login", require("./admin/login"));
//创建用户列表路由
admin.get("/user", require("./admin/userPage"));
//实现退出功能
admin.get("/logout", require("./admin/logout"));
//创建用户编辑页面路由
admin.get("/user-edit", require("./admin/user-edit"));
//创建用户添加功能路由
admin.post("/user-edit", require("./admin/user-edit-fn"));
//创建用户修改功能路由
admin.post("/user-modify", require("./admin/user-modify"));
//创建用户删除功能路由
admin.get("/delete", require("./admin/user-delete"));
//创建文章删除功能路由
admin.get('/article-delete',require("./admin/article-delete"))
//文章列表页面路由
admin.get("/article",require('./admin/article'));
//文章编辑页面路由
admin.get("/article-edit", require('./admin/article-edit'));
//文章添加功能的路由
admin.post('/article-add',require('./admin/article-add'))
//文章更新功能的路由
admin.post('/article-modify',require('./admin/article-modify'))
//将路由对象作为模块进行导出
module.exports = admin;
