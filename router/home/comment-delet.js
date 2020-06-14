const { Comment } = require('../../model/comment');
module.exports = async (req, res) => {
    // 接收请求参数
    let id = req.query.id;
    // 删除评论
    await Comment.findOneAndRemove({ _id: id });
    res.send('评论已删除');
}