// 导入评论集合
const { Comment } = require('../../model/comment');

module.exports = async (req, res) => {
    // 获取数据
    let { userId, articleId, content } = req.body;
    // 向集合中添加评论
    await Comment.create({
        userId: userId,
        articleId: articleId,
        content: content,
        publishDate: new Date()
    })
    // 重定向回文章详情页面
    res.redirect('/home/article?id=' + articleId);
}