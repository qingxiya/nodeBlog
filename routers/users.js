// 用户主页，设置
var express = require('express')
var User = require('../models/user.js')
// md5
var md5 = require('blueimp-md5')

var router = express.Router()
// 个人主页
router.get('/settings/homepage',function(req,res){
	res.render('settings/homepage.html',{
		users: req.session.bodys
	})
})

// 设置
router.get('/settings/setting',function(req,res){
	res.render('settings/setting.html',{
		users: req.session.bodys
	})
})


// 设置 post
router.post('/settings/setting',function(req,res){
	var body=req.body
	// 将用户输入的密码和数据库中的密码作比较//数据库密码从前端隐藏的input中拿到
	var currentPasswordTwo = md5(md5(body.currentPasswordTwo))
	if(body.currentPassword != currentPasswordTwo){
		return res.status(200).json({
			err_code: 1,
			message: 'password 错误'
		})
	}
	// 将新密码加密
	body.password = md5(md5(body.password))
	User.findByIdAndUpdate(req.body.id.replace(/"/g,''),req.body,function(err){
		if(err){
			return res.status(500).json({
				err_code: 500,
				message: '500 error'
			})
		}
		// 成功
		return res.status(200).json({
			err_code: 0,
			message: 'ok'
		})
	})
})

// 删除账户
router.get('/settings/delete',function(req,res){
	var id=req.query.id
	User.findByIdAndRemove(id.replace(/"/g,''),function(err){
		if(err){
			return	res.status(500).send('404 Server Error.')
		}
		return res.status(200).send('您的账户已被注销.')
	})
})

module.exports = router
