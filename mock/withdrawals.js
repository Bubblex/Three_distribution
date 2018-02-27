import Mock from 'mockjs'
import { generatePaginateData } from './lib'

export default {
    // 5.2.1 提现
    'POST /api/withdrawals/money': {
        status: 409,
        message: '提现成功',
        data: null,
    },

    // 5.2.2 提现列表
    'POST /api/withdrawals/list': (req, res) => {
        const mock = Mock.mock({
            account: {
                phone: /[0-9]{11}/,
            },
            code: '@natural(1, 99999999)',
            price: '@float(60, 1000, 2, 2)',
            status: '@natural(1, 3)',
            created_at: '@datetime("yyyy-MM-dd")',
            info: '@csentence(8, 15)',
            finish_date: '@datetime("yyyy-MM-dd")',
            card_title: '@cname()',
            card_phone: /[0-9]{11}/,
            card_bank: '建设银行',
            card_code: /[0-9]{18}/,
        })

        res.end(JSON.stringify({
            status: 1,
            message: '查询成功',
            data: generatePaginateData(mock, req.body, { dataName: 'list' }),
            // data: { list: [] },
        }))
    },
}
