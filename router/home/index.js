const { Article } = require('../../model/article');
const pagination = require('mongoose-sex-page');
module.exports = async (req, res) => {
    const { page } = req.query || 1;
    // 查询数据库数据
    let articles = await pagination(Article).find().page(page).size(4).display(5).populate('author').exec();
    // res.send(articles);
    // 渲染数据
    res.render('home/default.art', {
        articles: articles
    });

}