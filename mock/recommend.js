import Mock from 'mockjs'

export default {
    // 4.1 推荐页数据
    'POST /api/recommend/data': {
        status: 1,
        message: '查询成功',
        data: Mock.mock({
            recommend: {
                id: '@natural(1, 1000)',
                image: '@image(200x200)',
            },
        }),
    },

    // 4.2 上传二维码
    'POST /api/recommend/upload': {
        status: 1,
        message: '上传成功',
        data: null,
    },

    // 4.3 微信分享配置
    'POST /api/recommend/config': {
        status: 1,
        message: '获取成功',
        data: Mock.mock({
            config: {
                appId: '@natural(1, 9999)',
                nonceStr: '@natural(1, 9999)',
                timestamp: '@natural(1, 9999)',
                signature: '@natural(1, 9999)',
            },
        }),
    },
}
