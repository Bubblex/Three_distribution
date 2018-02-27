import React from 'react'
import styles from './none/none.less'

class None extends React.Component {
    render() {
        return (
            <div className={styles.none}>
                {this.props.text}~
            </div>
        )
    }
}

export default None
