import React from 'react'
import { connect } from 'dva'
import classNames from 'classnames'
import { Button } from 'antd-mobile'
import styles from './error/error.less'
import publicStyles from './public/public.less'

class Forbidden extends React.Component {
    customerService = () => {
        this.props.dispatch({
            type: 'common/getCommonService',
        })
    }

    render() {
        return (
            <div className={styles.forbidden}>
                <Button className={classNames(publicStyles.bigButton, styles.serviceBtn)} type='primary' onClick={this.customerService}>
                    联系客服
                </Button>
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(Forbidden)
