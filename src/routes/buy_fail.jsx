import React from 'react'
import { connect } from 'dva'
import classNames from 'classnames'
import {
    Button,
} from 'antd-mobile'
import { browserHistory } from 'dva/router'
import styles from './buy/buy.less'
import publicStyles from './public/public.less'

class BuyFail extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.fail}>
                    支付失败
                </div>
                <Button className={classNames(publicStyles.bigButton, styles.signBtn)} type='primary' onClick={() => { browserHistory.goBack() }}>完 成</Button>
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(BuyFail)
