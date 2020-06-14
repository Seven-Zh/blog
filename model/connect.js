
// 引入模块
const mongoose = require('mongoose');
const config = require('config');
mongoose.set('useCreateIndex', true);
// 连接数据库
mongoose.connect(`mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`,
    // 注意这里要传递第二个参数，不然会报错
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('数据库连接成功'))
    .catch(err => console.log(err, '数据库连接失败'))

// 导出数据库模块
module.exports = mongoose;