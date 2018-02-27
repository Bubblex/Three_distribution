import Mock from 'mockjs'
import { generatePaginateData } from './lib'

export default {
    // 5.4.1 消费列表
    'POST /api/recharge/list': (req, res) => {
        const mock = Mock.mock({
            level: {
                title: '国王合伙人',
            },
            code: '@natural(1, 9999)',
            unit_price: '@float(60, 1000, 2, 2)',
            nums: '@natural(1, 9999)',
            created_at: '@datetime("yyyy-MM-dd")',
            o_price: '@float(60, 1000, 2, 2)',
            p_price: '@float(60, 1000, 2, 2)',
            d_price: '@float(60, 1000, 2, 2)',
        })

        res.end(JSON.stringify({
            status: 1,
            message: '查询成功',
            data: generatePaginateData(mock, req.body, { dataName: 'list' }),
            // data: { list: [] },
        }))
    },

    // 消费详情
    'POST /api/recharge/detail': {
        status: 1,
        message: '查询成功',
        data: Mock.mock({
            level: {
                title: '国王合伙人',
            },
            account: {
                title: '@cname()',
            },
            type: 1,
            unit_price: 28,
            phone: /[0-9]{11}/,
            nums: '@natural(1, 9999)',
            code: '@natural(1, 9999)',
            created_at: '@datetime("yyyy-MM-dd")',
            o_price: '@float(60, 1000, 2, 2)',
            p_price: '@float(60, 1000, 2, 2)',
            d_price: '@float(60, 1000, 2, 2)',
        }),
    },
}
