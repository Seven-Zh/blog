const { User } = require('../../model/user');
const bcrypt = require('bcryptjs');

module.exports = async (req, res) => {
    // 接收post参数
    let {
        userName,
        email,
        password,
        role,
        statu
    } = req.body;
    // 要修改的用户id
    let id = req.query.id;
    // 查找用户
    let user = await User.findOne({ _id: id });
    // 比对密码
    let isEquel = await bcrypt.compareSync(password, user.password);
    // 如果比对成功
    if (isEquel) {
        // 更新用户信息
        await User.updateOne({ _id: id }, {
            userName: userName,
            email: email,
            role: role,
            statu: statu
        });
        // 重定向页面
        res.redirect('/admin/user');
    } else {
        // 密码比对失败
        // 重定向并返回错误信息
        res.redirect('/admin/user-edit?message="密码错误，不能修改用户信息"&id=' + id)
    }
}