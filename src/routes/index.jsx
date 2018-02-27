import React from 'react'
import { connect } from 'dva'
import classNames from 'classnames'
import { Button } from 'antd-mobile'
import ROUTES from '../config/routes'
import styles from './index/index.less'
import publicStyles from './public/public.less'

class Index extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <img src={require('./index/header.png')} alt='' />
                <img src={require('./index/function.png')} alt='' />
                <img src={require('./index/scena.png')} alt='' />
                <img src={require('./index/scen2.png')} alt='' />
                <img src={require('./index/price.png')} alt='' />
                <img src={require('./index/pyramid.png')} alt='' />
                <img src={require('./index/right.png')} alt='' />
                <img src={require('./index/line.png')} alt='' />
                <img src={require('./index/level.png')} alt='' />
                <Button
                    className={classNames(publicStyles.bigButton, styles.buyBtn)}
                    type='primary'
                    onClick={() => {
                        window.location.href = ROUTES.BUY
                    }}
                >立即购买</Button>
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(Index)
