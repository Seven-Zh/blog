// 导入模块
const mongoose = require('mongoose');
const { User } = require('./user');
// 创建集合规则


const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, '请输入标题'],
        minlength: 3,
        maxlength: 20
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: [true, '请输入作者名']
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    cover: {
        type: String,
        default: null
    },
    content: {
        type: String,
    }
})
// 创建集合
const Article = mongoose.model('Article', articleSchema);

module.exports = {
    Article
}