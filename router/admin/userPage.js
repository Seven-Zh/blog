const { User } = require('../../model/user');
const pagination = require('mongoose-sex-page');
module.exports = async (req, res) => {
    req.app.locals.current = 'user';
    // 接收数据
    let id = req.query.id;
    // 判断是否是超级管理员
    if (req.session.role == 'admin') {
        let page = req.query.page || 1;
        // 查找数据
        let users = await pagination(User).find().page(page).size(5).display(5).exec();
        // 渲染数据
        res.render('admin/user', {
            users: users,
        });
    } else {
        if (id) {
            // 用户是普通用户，只响应与自己相关的信息
            let users = await User.findOne({ _id: id });
            res.render('admin/user', {
                users: users
            })
        } else {
            // 没有传递id，则返回博客首页
            res.redirect('/home/')
        }
    }

}