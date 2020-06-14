const { User } = require('../../model/user');
module.exports = async (req, res) => {
    req.app.locals.current = 'user';
    let { message, id } = req.query;
    // 判断是否是超级管理员
    if (req.session.role == 'admin') {
        // 判断是否传递了id,传递了id就是修改功能
        if (id) {
            let user = await User.findOne({ _id: id });
            res.render('admin/user-edit', {
                message: message,
                user: user,
                link: '/admin/user-modify?id=' + id,
                button: '修改'
            })
        } else {
            res.render('admin/user-edit', {
                message: message,
                link: '/admin/user-add',
                button: '添加'
            });
        }
    } else {
        let user = await User.findOne({ _id: id });
        res.render('admin/user-edit', {
            message: message,
            user: user,
            link: '/admin/user-modify?id=' + id,
            button: '修改'
        })
    }
}