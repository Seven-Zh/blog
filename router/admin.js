// 导入模块
const express = require('express');
const bcrypt = require('bcryptjs');

// 创建模块化路由
const admin = express.Router();


// 导入用户集合
const { User } = require('../model/user');
// 登录页面路由
admin.get('/login', require('./admin/loginPage'));
// 用户登录路由
admin.post('/login', require('./admin/login'));
// 用户列表路由
admin.get('/user', require('./admin/userPage'));

// 用户登出路由
admin.get('/logout', require('./admin/logout'));
// 用户编辑路由
admin.get('/user-edit', require('./admin/user-edit'));
// 修改用户路由
admin.post('/user-modify', require('./admin/user-modify'));
// 用户添加路由
admin.post('/user-add', require('./admin/user-add'));
// 删除用户路由
admin.get('/user-delete', require('./admin/user-delet'));
// 文章列表页面路由
admin.get('/article', require('./admin/article'));
// 文章编辑页面路由
admin.get('/article-edit', require('./admin/article-edit'));
// 添加文章功能路由
admin.post('/article-add', require('./admin/article-add'));
// 修改文章路由
admin.post('/article-modify', require('./admin/article-modify'));
// 删除文章路由
admin.get('/article-delete', require('./admin/article-delete'));
module.exports = admin;