// 导入模块
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const dateFormat = require('dateformat');
const template = require('art-template');
const morgan = require('morgan');

// 创建服务器
const app = express();
// 连接数据库
require('./model/connect');

// 设置session
app.use(session({
    resave: false,
    secret: 'secret key',
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}));
// 设置模板引擎
// 选择模板引擎
app.engine('art', require('express-art-template'));
// 设置目录
app.set('views', path.join(__dirname, 'views'));
// 设置后缀名
app.set('view engine', 'art');
// 向模板内倒入变量
template.defaults.imports.dateFormat = dateFormat;

// 设置body-parser
app.use(bodyParser.urlencoded({ extended: false }));

// 开放静态资源
app.use(express.static(path.join(__dirname, 'public')));

// console.log(process.env);

if (process.env.NODE_ENV == 'development') {
    console.log('当前是开发环境');
    // app.use(morgan('dev'));
} else {
    console.log('当前是生产环境');
}

// 导入模块化路由
const home = require('./router/home');
const admin = require('./router/admin');

// // 登录拦截功能
// app.use('/admin', require('./middleware/loginGuard'));

app.use('/home', home);
app.use('/admin', admin);

// 错误处理中间件
app.use((err, req, res, next) => {
    // 将字符串转换为对象
    const result = JSON.parse(err);
    let params = [];
    for (var k in result) {
        if (k != path) {
            params.push(k + '=' + result[k]);
        }
    }
    res.redirect(`${result.path}?${params.join('&')}`)
})

app.listen(80);
console.log('服务器启动成功');