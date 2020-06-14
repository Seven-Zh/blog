const { Article } = require('../../model/article');

module.exports = async (req, res) => {
    let id = req.query.id;
    // 删除文章
    await Article.findOneAndDelete({ _id: id });
    // 重定向
    res.redirect('/admin/article');
}