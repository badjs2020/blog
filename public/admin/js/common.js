function serializeToJson(form){
  var result={};
  //获取表单中用户输入的内容
  //会有两个属性，一个是name一个是value[{name:,value:,}]
  var f=form.serializeArray();
  f.forEach(function(item){
    //result.email
    result[item.name]=item.value;
  });
  return result;
}