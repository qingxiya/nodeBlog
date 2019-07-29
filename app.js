var express=require('express')
var path=require('path')
var session=require('express-session')
// 登陆注册路由
var sessionRouter=require('./routers/session')
// 话题
var topicRouter=require('./routers/topic')
// 用户
var usersRouter=require('./routers/users')
var bodyParser=require('body-parser')
var app=express();
// 公开资源
app.use('/public/',express.static(path.join(__dirname,'./public/')))
app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules/')))
// 配置art-template模板
app.engine('html',require('express-art-template'))
// 配置body-parser中间件，获取表单数据
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
// session
app.use(session({
  secret: 'keyboard',
  resave: false,
  saveUninitialized: true
}))

app.use(sessionRouter)
app.use(topicRouter)
app.use(usersRouter)

// 配置404处理中间件
app.use(function(req,res){
	res.render('404.html')
})
// 配置500处理中间件
app.use(function(err,req,res,next){
	res.render('500.html')
})

app.listen(3000,function(){
	console.log('running.....3000')
})