// 注册、登陆、退出
var express = require('express')
//引入user.js数据库模型
var User = require('../models/user.js')
var Topic = require('../models/topic.js')
// md5
var md5 = require('blueimp-md5')

var router = express.Router()
// 主页
router.get('/', function(req, res) {
	Topic.find(function(err,topics){
		if(err){
			return	res.status(500).send('500 Server Error.')
		}
		res.render('index.html',{
			// 设置发表文章到主页的模板
			topics:topics,
			users: req.session.bodys
		})
	})
})

router.get('/login', function(req, res) {
	res.render('login.html')
})
// 请求登录
router.post('/login', function(req, res, next) {
	var body = req.body
	// 验证账号密码
	User.findOne({
		email: body.email,
		password: md5(md5(body.password))
	}, function(err, user) {
		if (err) {
			// 给中间件去处理错误
			next()
		}
		if (!user) {
			return res.status(200).json({
				err_code: 1,
				message: 'Email or password is invalid.'
			})
		}
		// 用户存在，登陆成功，通过 Session 记录登陆状态
		req.session.bodys = user

		res.status(200).json({
			err_code: 0,
			message: 'OK'
		})
	})

})

router.get('/register', function(req, res) {
	res.render('register.html')
})
// 注册提交处理post
router.post('/register', async function(req, res, next) {
	var body = req.body
	try {
		if (await User.findOne({
				email: body.email
			})) {
			return res.status(200).json({
				err_code: 1,
				message: '邮箱已存在'
			})
		}
		if (await User.findOne({
				nickname: body.nickname
			})) {
			return res.status(200).json({
				err_code: 2,
				message: '昵称已存在'
			})
		}
		// 加密
		body.password = md5(md5(body.password))
		// 创建用户
		await new User(body).save(function(err,user){
			if (err) {
			return res.status(500).json({
			  err_code: 500,
			  message: 'Internal error.'
			})
		}
		// 注册成功使用session保存登录状态
		req.session.bodys = user
		res.status(200).json({
			err_code: 0,
			message: 'OK'
		})
		})
	} catch (err) {
		next()
	}

})
// 退出登录
router.get('/logout',function(req,res){
	// 清除登录状态
	req.session.bodys=null
	res.redirect('/login')
})

module.exports = router
