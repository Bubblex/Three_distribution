import Mock from 'mockjs'

export default {
    // 2.1 登录接口
    'POST /api/account/login': {
        status: 1,
        message: '登录成功',
        data: Mock.mock({
            token: /[0-9]{9}/,
        }),
    },

    // 2.2 注册接口
    'POST /api/account/sign': {
        status: 1,
        message: '注册成功',
        data: Mock.mock({
            token: /[0-9]{9}/,
        }),
    },

    // 2.3 忘记密码接口
    'POST /api/account/find-password': {
        status: 1,
        message: '修改密码成功',
        data: null,
    },

    // 2.4 修改密码接口
    'POST /api/account/update-password': {
        status: 1,
        message: '修改密码成功',
        data: null,
    },
}
