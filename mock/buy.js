import Mock from 'mockjs'

export default {
    // 5.4.3 支付
    // 'POST /api/buy/do-buy': {
    //     status: 1,
    //     message: '购买成功',
    //     data: null,
    // },

    // 5.4.3 支付
    'POST /api/recharge/pay': {
        status: 1,
        message: '请求成功',
        data: Mock.mock({
            code: '@natural(1, 999)',
            wechatPay: {
                appId: '@cname()',
                timeStamp: '@datetime("yyyy-MM-dd")',
                nonceStr: '@natural(1, 999)',
                package: '@natural(1, 999)',
                signType: '@natural(1, 999)',
                paySign: '@natural(1, 999)',
            },
        }),
    },
}
