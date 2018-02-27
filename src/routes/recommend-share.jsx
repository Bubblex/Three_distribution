import React from 'react'
import { connect } from 'dva'
import classNames from 'classnames'
import styles from './recommend/recommend.less'

class RecommendShare extends React.Component {
    render() {
        const {
            recommend: {
                recommendData: {
                    image,
                },
            },
        } = this.props
        return (
            <div className={styles.container}>
                <div className={styles.publicity} />
                <div className={classNames(styles.qrcode, styles.preview)}>
                    <img alt='' src={image} />
                </div>
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(RecommendShare)
