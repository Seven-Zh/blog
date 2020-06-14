const { User } = require('../../model/user');

module.exports = async (req, res) => {
    let id = req.query.id;
    // 删除用户
    await User.findOneAndDelete({ _id: id });
    // 重定向
    res.redirect('/admin/user');
}