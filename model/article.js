// 1、引入mongoose模块
const mongoose=require('mongoose')
//2、创建文章集合规则
const articelSchema=new mongoose.Schema({
  title:{
    type:String,
    maxlength:40,
    minlength:4,
    required:[true,'标题不符合规范']
  },
  author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:[true,'请写上作者名字']
  },
  publishDate:{
    type:Date,
    default:Date.now
  },
  cover:{
    //存储的是文件上传的路径和文件名称
    type:String,
    default:null
  },
  content:{
    type:String
  }
})
//3、根据规则创建集合
const Article=mongoose.model('Article',articelSchema);
//4、将集合规则作为模板成员进行导出
module.exports={
  Article:Article
}