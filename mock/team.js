import Mock from 'mockjs'
import { generatePaginateData } from './lib'

export default {
    // 5.6.1 我的团队列表
    'POST /api/team/list': (req, res) => {
        const mock = Mock.mock({
            id: '@natural(1, 9999)',
            title: '@natural(1, 9999)',
            level_id: '@natural(1, 4)',
            top_id: '@natural(1, 9999)',
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
                    type: 2,
                    level_id: 1,
                },
            },
        }))
    },

    // 5.6.2 banner图
    'POST /api/team/banner': {
        status: 1,
        message: '查询成功',
        data: Mock.mock({
            'list|5': [{
                image: '@image(400x300)',
            }],
        }),
    },
}
