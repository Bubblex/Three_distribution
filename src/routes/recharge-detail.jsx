import React from 'react'
import moment from 'moment'
import { connect } from 'dva'
import classNames from 'classnames'
import { Button } from 'antd-mobile'
import ROUTES from '../config/routes'
import { browserHistory } from 'dva/router'
import styles from './recharge/recharge.less'

import publicStyles from './public/public.less'

class RechargeDetail extends React.Component {
    componentWillUnmount() {
        this.props.dispatch({
            type: 'recharge/saveRechargeDetail',
            rechargeDateil: {
                level: {},
                account: {},
            },
        })
    }

    render() {
        const {
            recharge: {
                rechargeDateil: {
                    level: {
                        title,
                    },
                    code,
                    nums,
                    p_price: pPrice,
                    o_price: oPrice,
                    d_price: dPrice,
                    unit_price: unitPrice,
                    created_at: createdAt,
                },
            },
            location: {
                query,
            },
        } = this.props

        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <p>-{pPrice && pPrice.toFixed(2)}</p>
                    <span>支付金额</span>
                </div>
                <div className={styles.item}>
                    <p>合伙人等级：{title}</p>
                    <p>单价：{unitPrice && unitPrice.toFixed(2)}元</p>
                    <p>数量：{nums}</p>
                    <p>原价：{oPrice && oPrice.toFixed(2)}</p>
                    <p>折扣：{dPrice && dPrice.toFixed(2)}</p>
                </div>
                <div>
                    <p>支付时间：{moment(createdAt).format('YYYY-MM-DD')}</p>
                    <p>订单号：{code}</p>
                </div>
                {
                    query.source
                    &&
                    <Button
                        className={classNames(publicStyles.bigButton, styles.linkUser)}
                        type='primary'
                        onClick={() => { browserHistory.push(ROUTES.USER) }}
                    >返回个人中心</Button>
                }
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(RechargeDetail)
