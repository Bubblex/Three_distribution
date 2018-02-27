export default {
    // 5.1.1 修改昵称/微信号
    'POST /api/user/update-info': {
        status: 1,
        message: '保存成功',
        data: null,
    },

    // 5.1.2 修改手机号
    'POST /api/user/update-phone': {
        status: 201,
        message: '验证旧手机成功',
        data: null,
    },
}
