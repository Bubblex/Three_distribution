import React from 'react'
import { connect } from 'dva'
import classNames from 'classnames'
import { Button } from 'antd-mobile'
import { browserHistory } from 'dva/router'
import styles from './buy/buy.less'
import ROUTES from '../config/routes'
import publicStyles from './public/public.less'

class BuySuccess extends React.Component {
    render() {
        const {
            recharge: {
                rechargeDateil: {
                    level: {
                        title,
                    },
                    account: {
                        title: accountTitle,
                    },
                    nums,
                    phone,
                    type,
                    p_price: pPrice,
                    created_at: createdAt,
                },
            },
            location: {
                query: {
                    code,
                },
            },
        } = this.props

        return (
            <div className={styles.container}>
                <div className={styles.success}>
                    支付成功
                </div>
                <div className={styles.order}>
                    <h1>订单信息</h1>
                    <p>交易方式：{type === 1 && '微信支付'}</p>
                    <p>下单时间：{createdAt}</p>
                    <p>联系人：{accountTitle}</p>
                    <p>电话：{phone}</p>
                    <p>合伙人等级：{title}</p>
                    <p>数量：{nums}</p>
                    <p>支付金额：￥{pPrice && pPrice.toFixed(2)}</p>
                </div>
                <Button
                    className={classNames(publicStyles.bigButton, styles.signBtn)}
                    type='primary'
                    onClick={() => { browserHistory.push(`${ROUTES.RECHARGE_DETAIL}?code=${code}&source=true`) }}
                >完 成</Button>
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(BuySuccess)
