import Mock from 'mockjs'

export default {
    // 1.1.1 发送验证码
    'POST /api/verify/message': {
        status: 1,
        message: '发送成功',
        data: null,
    },

    // 1.1.2 微信配置
    'POST /api/common/config': {
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

    // 1.1.3 多客服
    'POST /api/common/service': {
        status: 1,
        message: '发送成功',
        data: null,
    },

    // 1.2.1 等级数据
    'POST /api/common/level': {
        status: 1,
        message: '查询成功',
        data: Mock.mock({
            level: [
                {
                    id: 1,
                    nums: 0,
                    title: '游客',
                    unit_price: 28,
                    all_nums: '@natural(1, 1000)',
                },
                {
                    id: 2,
                    nums: 10,
                    unit_price: 28,
                    title: '爵士合伙人',
                    all_nums: 10,
                },
                {
                    id: 3,
                    nums: 50,
                    unit_price: 28,
                    title: '王子合伙人',
                    all_nums: 50,
                },
                {
                    id: 4,
                    nums: 200,
                    unit_price: 28,
                    title: '国王合伙人',
                    all_nums: 200,
                },
            ],
        }),
    },

    // 1.2.2 个人信息数据
    'POST /api/common/user': {
        status: 1,
        message: '查询成功',
        data: Mock.mock({
            account: {
                code: /[0-9]{11}/,
                title: '@cname()',
                province_id: 1,
                city_id: 1,
                county_id: 2,
                province: '江苏省',
                city: '徐州市',
                county: '泉山区',
                address: '福顺路福顺大楼三楼一兜科技',
                phone: /[0-9]{11}/,
                id: '@natural(1, 1000)',
                // wechat_code: /[0-9]{11}/,
                wechat_code: null,
                buy_nums: '@natural(1, 1000)',
                level: {
                    discount: 1,
                    title: '国王合伙人',
                    id: '@natural(1, 4)',
                },
                info: {
                    id: '@natural(1, 1000)',
                    all_nums: '@natural(1, 1000)',
                    two_nums: '@natural(1, 1000)',
                    three_nums: '@natural(1, 1000)',
                    four_nums: '@natural(1, 1000)',
                    recharge: '@float(60, 1000, 2, 2)',
                    now_profit: '@float(60, 1000, 2, 2)',
                    // now_profit: 0,
                    all_profit: '@float(60, 1000, 2, 2)',
                    two_profit: '@float(60, 1000, 2, 2)',
                    four_profit: '@float(60, 1000, 2, 2)',
                    withdrawals: '@float(60, 1000, 2, 2)',
                    today_profit: '@float(60, 1000, 2, 2)',
                    three_profit: '@float(60, 1000, 2, 2)',
                    yesterday_profit: '@float(60, 1000, 2, 2)',
                },
            },
        }),
    },

    // 1.2.3 银行卡列表数据
    'POST /api/common/card': {
        status: 1,
        message: '发送成功',
        data: Mock.mock({
            cards: [
                {
                    id: '@natural(1, 1000000)',
                    title: '@cname()',
                    phone: /[0-9]{11}/,
                    status: 2,
                    bank: '@csentence(8, 15)',
                    code: /[0-9]{19}/,
                },
                {
                    id: '@natural(1, 1000000)',
                    title: '@cname()',
                    phone: /[0-9]{11}/,
                    status: 2,
                    bank: '@csentence(8, 15)',
                    code: /[0-9]{19}/,
                },
                {
                    id: '@natural(1, 1000000)',
                    title: '@cname()',
                    phone: /[0-9]{11}/,
                    status: 1,
                    bank: '@csentence(8, 15)',
                    code: /[0-9]{19}/,
                },
            ],
            // cards: [],
        }),
    },

    // 1.2.4 城市级联数据
    'POST /api/common/address': {
        status: 1,
        message: '发送成功',
        data: {
            address: [
                {
                    value: 1,
                    label: '江苏省',
                    children: [
                        {
                            value: 1,
                            label: '徐州市',
                            children: [
                                {
                                    value: 1,
                                    label: '丰县',
                                },
                                {
                                    value: 2,
                                    label: '泉山区',
                                },
                            ],
                        },
                        {
                            value: 1,
                            label: '南京市',
                            children: [
                                {
                                    value: 1,
                                    label: '鼓楼区',
                                },
                            ],
                        },
                    ],
                },
                {
                    value: 2,
                    label: '浙江省',
                    children: [{
                        value: 1,
                        label: '杭州市',
                        children: [{
                            value: 1,
                            label: '某县',
                        }],
                    }],
                },
            ],
        },
    },
}
