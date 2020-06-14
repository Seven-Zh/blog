const formidable = require('formidable');
const path = require('path');
const { Article } = require('../../model/article');

module.exports = (req, res) => {
    // 创建表单解析对象
    const form = new formidable.IncomingForm();
    // 设置文件存储路径
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'upload');
    // 保留文件后缀名
    form.keepExtensions = true;
    // 解析表单数据
    form.parse(req, async (err, fields, files) => {
        // 创建新文章
        await Article.create({
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            cover: files.cover.path.split('public')[1],
            content: fields.content
        })
    })
    // 重定向回到用户列表页面
    res.redirect('/admin/article');
}