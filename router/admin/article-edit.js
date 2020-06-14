const { Article } = require('../../model/article');

module.exports = async (req, res) => {
    req.app.locals.current = 'article';
    let { message, id } = req.query;
    // 判断是否传递了id,传递了id就是修改功能
    if (id) {
        let article = await Article.findOne({ _id: id }).populate('author');
        res.render('admin/article-edit', {
            message: message,
            article: article,
            link: '/admin/article-modify?id=' + id,
            button: '修改'
        })
    } else {
        res.render('admin/article-edit', {
            message: message,
            link: '/admin/article-add',
            button: '添加'
        });
    }
}