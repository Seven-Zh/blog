// 设置用户集合
// 导入模块
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
// 创建集合规则
const userSchem = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 10
    },
    email: {
        type: String,
        // 保证邮箱唯一性
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'normal'
    },
    statu: {
        type: Number,
        // 0启用，1禁用，默认1
        default: 0
    }
});

const User = mongoose.model('User', userSchem);

// 创建用户
async function createUser() {
    let salt = await bcrypt.genSaltSync(10);
    let pass = await bcrypt.hashSync('123456', salt);
    let user = User.create({
        userName: 'zhangzhiqi',
        email: 'zhaozhiqi@qq.com',
        password: pass,
        role: 'admin',
        statu: 0
    })
}

async function Validate(user) {
    // 创建规则
    const schema = {
        userName: Joi.string().min(2).max(20).required().error(new Error('用户名格式不符合规则')),
        email: Joi.string().email().error(new Error('邮箱格式不符合规则')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{6,20}$/).error(new Error('密码格式不符合规则')),
        role: Joi.string().valid('normal', 'admin').error(new Error('角色值非法')),
        statu: Joi.number().valid(0, 1).error(new Error('状态值非法'))
    }
    return Joi.validate(user, schema);
}
// createUser();


module.exports = {
    User,
    Validate: Validate
};