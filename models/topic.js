var mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/blog', {useNewUrlParser: true});
var Schema=mongoose.Schema

var topicSchema = new Schema({
	// 发表者昵称
	nickname:{
		type:String,
		required:true
	},
	// 所属模块
	plate:{
		type:String,
		required:true
	},
	// 标题
	title:{
		type:String,
		required:true
	},
	// 内容
	context:{
		type:String,
		required:true
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
	last_modified_time:{
		type:Date,
		default:Date.now
	},
	// 头像
	// 修改时间
	avatar:{
		type:String,
		default:'/public/img/avatar-default.png'
	},
	// 介绍
	bio:{
		type:String,
		default:''
	},
	gender:{
		type:Number,
		// 保密，男，女
		enum: [-1,0,1],
		default:-1
	}
}) 

module.exports=mongoose.model('Topic',topicSchema)