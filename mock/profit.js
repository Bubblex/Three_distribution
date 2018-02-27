import Mock from 'mockjs'
import { generatePaginateData } from './lib'

export default {
    // 5.5.1 我的收益列表
    'POST /api/profit/list': (req, res) => {
        const mock = Mock.mock({
            baccount: {
                id: '@natural(1, 9999)',
                top_id: '@natural(1, 9999)',
                title: '@cname()',
                phone: /[0-9]{11}/,
            },
            level: {
                title: '国王合伙人',
                id: '@natural(1, 4)',
            },
            nums: '@natural(1, 9999)',
            profit: '@float(60, 1000, 2, 2)',
            o_price: '@float(60, 1000, 2, 2)',
            unit_price: '@float(60, 1000, 2, 2)',
            created_at: '@datetime("yyyy-MM-dd")',
        })

        res.end(JSON.stringify({
            status: 1,
            message: '查询成功',
            data: {
                ...generatePaginateData(mock, req.body, { dataName: 'list' }),
                account: {
                    id: 2,
                    phone: 14851376919,
                    title: '哈哈',
                    type: 1,
                    level_id: 1,
                },
            },
        }))
    },

    // 5.5.2 近七天收益数据
    'POST /api/profit/line': {
        status: 1,
        message: '查询成功',
        data: Mock.mock({
            data: [
                { created_at: '2016-08-01 00:00:0', num: '@natural(100, 9999)' },
                { created_at: '2016-08-02 00:00:0', num: '@natural(100, 9999)' },
                { created_at: '2016-08-03 00:00:0', num: '@natural(100, 9999)' },
                { created_at: '2016-08-04 00:00:0', num: '@natural(100, 9999)' },
                { created_at: '2016-08-05 00:00:0', num: '@natural(100, 9999)' },
                { created_at: '2016-08-06 00:00:0', num: '@natural(100, 9999)' },
                { created_at: '2016-08-07 00:00:0', num: '@natural(100, 9999)' },
            ],
        }),
    },
}
