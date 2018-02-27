import React from 'react'
import { connect } from 'dva'
import { browserHistory } from 'dva/router'
import ROUTES from '../config/routes'
import styles from './basic/basic.less'
import { hideOptionMenu } from '../utils/wechat'


class AccountSign extends React.Component {
    constructor(props) {
        super(props)
        this.backTopBtn = null
    }

    componentDidMount = () => {
        window.onscroll = () => {
            const btn = this.backTopBtn
            const winHeight = document.documentElement.clientHeight
            const toTop = document.body.scrollTop || document.documentElement.scrollTop
            if (toTop >= winHeight) {
                btn.style.display = 'block'
            } else {
                btn.style.display = 'none'
            }
        }
    }

    componentDidUpdate() {
        hideOptionMenu()
    }

    backTop = () => {
        const timer = setInterval(() => {
            const toTop = document.body.scrollTop || document.documentElement.scrollTop
            const speed = Math.ceil(toTop / 1.5)
            document.documentElement.scrollTop = document.body.scrollTop = toTop - speed
            if (toTop === 0) {
                clearInterval(timer)
            }
        }, 50)
    }

    customerService = () => {
        this.props.dispatch({
            type: 'common/getCommonService',
        })
    }

    render() {
        const {
            children,
            children: {
                props: {
                    route: {
                        showUser,
                        showLinkHot,
                    },
                },
            },
        } = this.props
        return (
            <div>
                {children}
                {
                    showUser
                    &&
                    <div
                        className={styles.user}
                        onClick={() => { browserHistory.push(ROUTES.USER) }}
                    />
                }
                {
                    showLinkHot
                    &&
                    <a
                        className={styles.linkhot}
                        href='javascript:'
                        onClick={this.customerService}
                    />
                }
                <div
                    onClick={this.backTop}
                    className={styles.backTop}
                    ref={(backTopBtn) => { this.backTopBtn = backTopBtn }}
                />
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(AccountSign)
