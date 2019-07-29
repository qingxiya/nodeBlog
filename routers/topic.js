// 新建话题、删除话题、修改话题、查看话题列表。。。。
var express = require('express')
//引入topic.js数据库模型
var Topic = require('../models/topic.js')
var Comment = require('../models/comment.js')
var router = express.Router()

// 发起
router.get('/topics/new',function(req,res){
	res.render('topic/new.html',{
		users: req.session.bodys
	})
})
// 发起post
router.post('/topics/new',function(req,res){
	var body=req.body
	// 保存数据
	new Topic(body).save()
	res.status(200).json({
		err_code: 0,
		message: 'OK'
	})
})
// 获得博客详情页
router.get('/topics/show',function(req,res){
	// console.log(req.body)
	Topic.findById(req.query.id.replace(/"/g,''),function(err,topic){
		if(err){
			return	res.status(500).send('500 Server Error.')
		}
		Comment.find(function(err,comment){
		if(err){
			return	res.status(500).send('500 Server Error.')
		}
		res.render('topic/show.html',{
			// 设置发表文章到具体页面的模板
			users: req.session.bodys,
			topics:topic,
			comments: comment
			})
		})
	})
})

// 博客评论（此功能为完善，评论会评论所有博客）
router.post('/comment',function(req,res){
	var  users= req.session.bodys
	if(!users){
		res.status(200).json({
			err_code: -1,
			message: 'No Login'
		})
	}
	if(users){
		var body=req.body
		// 保存数据
		new Comment(body).save()
		res.status(200).json({
			err_code: 0,
			message: 'OK'
		})
	}
})

// 编辑
router.get('/topics/edit',function(req,res){
	res.render('topic/edit.html',{
		users: req.session.bodys
	})
})

module.exports = router
