var mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/blog', {useNewUrlParser: true});
var Schema=mongoose.Schema

var userSchema = new Schema({
	email:{
		type:String,
		required:true
	},
	nickname:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	},
	// 可选的
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
	},
	birthday:{
		type:Date,
	},
	// 状态
	status:{
		type:Number,
		// 是否可以登录使用和评论
		// 0正常，1禁止评论，2禁止登录
		enum: [0,1,2],
		default:0
	}
	
}) 

module.exports=mongoose.model('User',userSchema)