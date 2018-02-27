import React from 'react'
import { connect } from 'dva'
import classNames from 'classnames'
import { browserHistory } from 'dva/router'
import {
    Flex,
    Grid,
    Modal,
    Toast,
} from 'antd-mobile'
import publicStyles from './public/public.less'
import { LEVEL_ID } from '../config/data-item'
import styles from './user/user.less'
import ROUTES from '../config/routes'

const FlexItem = Flex.Item
const prompt = Modal.prompt

class User extends React.Component {
    closeWetchatLayer = () => {
        this.props.dispatch({
            type: 'user/changeIsShowWechatCode',
            isShowWechatCode: false,
        })
        this.props.dispatch({
            type: 'user/changeIsCloseWechatCode',
            isCloseWechatCode: true,
        })
    }

    clickGrid = (val) => {
        browserHistory.push(val.link)
    }

    render() {
        const {
            common: {
                commonUser: {
                    id,
                    title: accountTitle,
                    level: {
                        id: accountLevelId,
                        title: levelTitle,
                    },
                    info: {
                        now_profit: nowProfit,
                    },
                },
            },
            user: {
                isShowWechatCode,
                isCloseWechatCode,
            },
        } = this.props

        const hasModal = document.getElementsByClassName('am-modal-wrap').length

        if (!isCloseWechatCode && isShowWechatCode && !hasModal) {
            prompt('请输入微信号', '',
                [
                    {
                        text: '取消',
                        onPress: () => {
                            this.closeWetchatLayer()
                        },
                    },
                    {
                        text: '提交',
                        onPress: value => new Promise((resolve) => {
                            resolve()
                            this.closeWetchatLayer()

                            if (!value) {
                                Toast.info('未填写微信号', 1)
                                return
                            }
                            else if (!/^[a-zA-Z\d_]{5,}$/.test(value)) {
                                Toast.info('所填微信号格式不正确', 1)
                                return
                            }
                            this.props.dispatch({
                                type: 'user/fetchUserUpdateInfo',
                                payload: {
                                    wechat_code: value,
                                },
                            })
                        }),
                    },
                ], 'default', null, ['请输入微信号'],
            )
        }

        const gridData = [
            {
                icon: require('./user/payment-code.png'),
                text: '收款码',
                link: ROUTES.INDEX,
            },
            {
                icon: require('./user/team.png'),
                text: '团队',
                link: ROUTES.TEAM,
            },
            {
                icon: require('./user/fee.png'),
                text: '佣金',
                link: ROUTES.PROFIT_LINE,
            },
            {
                icon: require('./user/withdraw-record.png'),
                text: '提现记录',
                link: ROUTES.WITHDRAWALS_HISTORY,
            },
            {
                icon: require('./user/consume-record.png'),
                text: '消费记录',
                link: ROUTES.RECHARGE,
            },
            {
                icon: require('./user/recommend.png'),
                text: '推荐',
                link: `${ROUTES.RECOMMEND}?id=${id}`,
            },
        ]

        return (
            <div>
                <div className={styles.userHeader}>
                    <div className={classNames(publicStyles.avatarTop, styles.avatarTop)}>
                        <div className={publicStyles.avatarContainer}>
                            <img
                                src={
                                    accountLevelId === LEVEL_ID.KING ? require('./public/king.png') :
                                    accountLevelId === LEVEL_ID.PRINCE ? require('./public/prince.png') :
                                    accountLevelId === LEVEL_ID.KING ? require('./public/king.png') :
                                    require('./public/avatar.png')
                                }
                                alt=''
                            />
                            <span className={styles.title}>{levelTitle}</span>
                            <div className={styles.editData} onClick={() => { browserHistory.push(ROUTES.USER_DATA) }} />
                        </div>
                        <p className={styles.nickname}>昵称：{accountTitle}</p>
                        <p className={styles.money}>可提现金额：{nowProfit && nowProfit.toFixed(2)}</p>
                    </div>
                </div>
                <Flex className={styles.center}>
                    <FlexItem>
                        <div
                            onClick={() => { browserHistory.push(ROUTES.WITHDRAWALS) }}
                            className={classNames(styles.applyWithdraw, styles.centerLink)}
                        >申请提现</div>
                    </FlexItem>
                    <FlexItem>
                        <div
                            onClick={() => { browserHistory.push(ROUTES.PROFIT) }}
                            className={classNames(styles.incomeDetail, styles.centerLink)}
                        >收益明细</div>
                    </FlexItem>
                </Flex>
                <Grid
                    columnNum={3}
                    data={gridData}
                    className={styles.grid}
                    onClick={(val) => { this.clickGrid(val) }}
                />
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(User)
