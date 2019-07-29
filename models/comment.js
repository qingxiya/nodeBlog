// 评论
var mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/blog', {useNewUrlParser: true});
var Schema=mongoose.Schema

var commentSchema = new Schema({
	// 文章的Id
	id:{
		type:String
	},
	// 发表者昵称
	nickname:{
		type:String,
		default:''
	},
	// 评论
	comment:{
		type:String,
		default:''
	},
	// 创建时间
	created_time:{
		type:Date,
		default:Date.now
	},
	// 修改时间
	avatar:{
		type:String,
		default:'/public/img/avatar-default.png'
	},
	
}) 

module.exports=mongoose.model('Comment',commentSchema)