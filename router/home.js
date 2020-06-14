// 导入模块
const express = require('express');
// 创建模块化路由
const home = express.Router();

// 博客首页路由
home.get('/', require('./home/index'));
// 文章详情页面路由
home.get('/article', require('./home/article'));
// 评论功能路由
home.post('/comment', require('./home/comment'));
// 删除评论功能路由
home.get('/deleteComment', require('./home/comment-delet'));
module.exports = home;