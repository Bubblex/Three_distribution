import React from 'react'
import { connect } from 'dva'
import styles from './error/error.less'

class Error extends React.Component {
    render() {
        return (
            <div className={styles.error}>
                <p>出错啦！</p>
                <p>该页面无法访问</p>
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(Error)
