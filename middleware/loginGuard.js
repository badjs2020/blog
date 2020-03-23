const guard=(req,res,next)=>{
  //判断用户访问的是否是登录页面
  //判断用户的登录状态
  //如果用户是登录 将请求放行
  //如果用户不是登录的，将请求重定向到登录界面
  if(req.url !='/login' && !req.session.username){
    //如果当前的界面不是登录界面且用户名为空，则重定向到登录页面
    res.redirect('/admin/login')
  }else{
    //用户是登录状态
    //还等判断用户角色
    //在login.js当中，当我们登录成功之后，我们将用户名存储在session当中
    //同样我们可以在login.js中将用户角色存储在session当中
    if(req.session.role=='normal')
    {
      //如果用户是普通用户，则跳转到首页
      return res.redirect('/home/')
    }
    next();
  }
}
module.exports=guard;