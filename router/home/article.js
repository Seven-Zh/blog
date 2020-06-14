// 导入数据集合
const { Article } = require('../../model/article');
const { Comment } = require('../../model/comment');
module.exports = async (req, res) => {
    let id = req.query.id;

    // 查询数据
    let article = await Article.findOne({ _id: id }).populate('author');
    let comments = await Comment.find({ articleId: id }).populate('userId');
    // 渲染数据

    res.render('home/article', {
        article: article,
        comments: comments
    });
}