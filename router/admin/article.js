const { Article } = require('../../model/article');
const pagination = require('mongoose-sex-page');
module.exports = async (req, res) => {
    req.app.locals.current = 'article';
    let id = req.query.id;
    // 判断用户是否为超级管理员
    if (req.session.role == 'admin') {
        let page = req.query.page || 1;
        // 查询数据
        let articles = await pagination(Article).find().page(page).size(5).display(5).populate('author').exec();

        // 渲染数据
        res.render('admin/article', { articles: articles });
    } else {
        // 普通用户只查找自己发布的文章
        if (id) {
            // 如果传递了id
            let page = req.query.page || 1;
            // 查询数据
            let articles = await pagination(Article).find({ author: id }).page(page).size(5).display(5).populate('author').exec();
            // 渲染数据
            res.render('admin/article', {
                articles: articles,
            });
        } else {
            // 如果没有传递id
            // 则返回博客首页
            res.redirect('/home/');
        }

    }
}