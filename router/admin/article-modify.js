const { Article } = require('../../model/article');
const formidable = require('formidable');
const path = require('path');
module.exports = (req, res) => {
    let id = req.query.id;
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        // 上传文件存储路径
        form.uploadDir = path.join(__dirname, '../', '../', 'public', 'upload');
        // 保留文件后缀名
        form.keepExtensions = true;
        // 更新数据
        await Article.updateOne({ _id: id }, {
            title: fields.title,
            publishDate: fields.publishDate,
            cover: files.cover.path.split('public')[1],
            content: fields.content
        })
        // 重定向回文章列表
        res.redirect('/admin/article');
    })

}