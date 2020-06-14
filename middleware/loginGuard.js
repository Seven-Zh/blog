// 判断用户是否登录
const guard = (req, res, next) => {
    if (req.url != '/login' && !req.session.userName) {
        // 如果是用户注册，放行
        if (req.url == '/user-edit' || req.url == '/user-add') {
            next();
        } else {
            // 用户没有登录，重定向回登录页面
            res.redirect('/admin/login');
        }
    } else {
        // 用户已登录或在登录页面
        next();
    }

}

module.exports = guard;