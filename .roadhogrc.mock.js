import Mock from 'mockjs'

import buy from './mock/buy'
import user from './mock/user'
import team from './mock/team'
import card from './mock/card'
import common from './mock/common'
import profit from './mock/profit'
import account from './mock/account'
import recharge from './mock/recharge'
import recommend from './mock/recommend'
import withdrawals from './mock/withdrawals'

export default {
    ...buy,
    ...user,
    ...team,
    ...card,
    ...common,
    ...profit,
    ...account,
    ...recharge,
    ...recommend,
    ...withdrawals,
}
