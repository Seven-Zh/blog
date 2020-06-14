// 倒入模块
const mongoose = require('mongoose');
const { Article } = require('./article');
const { User } = require('./user');

// 创建评论集合规则
const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    articleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Article,
        required: true
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String
    }
})
// 创建评论集合
const Comment = mongoose.model('Commont', commentSchema);

// 导出评论集合
module.exports = {
    Comment
}