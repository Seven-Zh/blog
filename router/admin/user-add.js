
const bcrypt = require('bcryptjs');
const { User, Validate } = require('../../model/user');

module.exports = async (req, res, next) => {
    req.app.locals.current = 'user';
    // 验证账号密码是否符合规范
    try {
        await Validate(req.body);
    } catch (e) {
        // return res.redirect(`/admin/user-edit?message=${e.message}`);
        return next(JSON.stringify({ path: '/admin/user-edit', message: e.message }));
    }
    // 查找用户
    let user = await User.findOne({ email: req.body.email });
    // 如果找到了相同的邮箱
    if (user) {
        // return res.redirect(`/admin/user-edit?message=邮箱已存在`);
        return next(JSON.stringify({ path: "/admin/user-edit", message: "邮箱已存在" }));
    }
    // 将密码加密
    let salt = await bcrypt.genSaltSync(10);
    let password = await bcrypt.hashSync(req.body.password, salt);
    req.body.password = password;
    // 创建用户
    await User.create(req.body);
    res.redirect('/admin/user');
}