const { User } = require('../../model/user');
const bcrypt = require('bcryptjs');

// 用户登录路由
module.exports = async (req, res) => {
    const { email, password } = req.body;
    // 判断用户是否输入内容
    if (email.trim().length == 0 || password.trim() == 0) {
        res.status(400).render('admin/common/error', { msg: '用户名或密码错误' });
    }
    // 查询数据库用户信息
    let user = await User.findOne({ email });
    // 判断是否查询到了用户
    if (user) {
        let isEquel = await bcrypt.compareSync(password, user.password);
        // 查询到了用户
        if (isEquel) {
            // 将用户名存储在请求对象中
            req.session.userName = user.userName;
            req.session.role = user.role;
            // 将变量设置到app.locals对象中
            req.app.locals.userInfo = user;
            // 判断用户角色
            if (user.role == 'admin') {
                // 重定向到用户管理页面
                res.redirect('/admin/user');
            } else {
                // 跳转到博客首页
                res.redirect('/home/')
            }

        } else {
            res.status(400).render('admin/common/error', { msg: '用户名或密码错误' });
        }
    }
}