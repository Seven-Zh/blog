module.exports = (req, res) => {
    // 删除session
    req.session.destroy(function () {
        // 删除cookie
        res.clearCookie('connect.sid');
        // 清空locals全局对象中的用户信息
        req.app.locals.userInfo = null;
        // 重定向回登录页面
        res.redirect('/admin/login');

    })
}