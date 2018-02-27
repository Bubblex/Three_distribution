import React from 'react'
import { connect } from 'dva'
import classNames from 'classnames'
import { browserHistory } from 'dva/router'
import {
    Flex,
    Toast,
    Modal,
    Button,
    InputItem,
} from 'antd-mobile'
import styles from './withdrawals/withfrawals.less'
import publicStyles from './public/public.less'
import ROUTES from '../config/routes'

const FlexItem = Flex.Item

class Withdrawals extends React.Component {
    onChange = (val) => {
        const {
            dispatch,
            common: {
                commonUser: {
                    info: {
                        now_profit: nowProfit,
                    },
                },
            },
        } = this.props

        let price = val

        if (val && !/^([1-9]\d*)?$/.test(val)) {
            price = ''
        }
        else if (!nowProfit) {
            price = ''
        }
        else if (val > nowProfit) {
            price = parseInt(nowProfit, 10)
        }

        dispatch({
            type: 'withdrawals/savePrice',
            price,
        })
    }

    changeSelectBank = (bankId) => {
        this.props.dispatch({
            type: 'withdrawals/saveBankId',
            bankId,
        })
    }

    confirmWithdraw = () => {
        const {
            withdrawals: {
                price,
                bankId,
            },
            dispatch,
        } = this.props

        if (!price) {
            Toast.fail('请输入提现金额', 1)
            return
        }
        else if (price < 100) {
            Toast.fail('请输入金额大于100元', 1)
            return
        }
        else if (!bankId) {
            Toast.fail('请选择银行卡', 1)
            return
        }

        dispatch({
            type: 'withdrawals/fetchWithdrawalsMoney',
            payload: {
                price,
                card_id: bankId,
            },
            Toast,
        })
    }

    closeModal = () => {
        this.props.dispatch({
            type: 'withdrawals/changeIsWithdrawing',
            isWithdrawing: false,
        })
    }

    render() {
        const {
            common: {
                commonUser: {
                    info: {
                        now_profit: nowProfit,
                    },
                },
                commonCard,
            },
            withdrawals: {
                price,
                bankId,
                isWithdrawing,
            },
        } = this.props

        return (
            <div className={styles.container}>
                <div className={styles.content}>
                    <p className={styles.title}>提现金额</p>
                    <div className={styles.inputContainer}>
                        {
                            !price
                            &&
                            <p className={styles.placeholder}><label>0.00</label><span>（大于100元）</span></p>
                        }
                        <InputItem
                            value={price}
                            className={classNames(publicStyles.iconInput, price < 100 && styles.error)}
                            onChange={(val) => { this.onChange(val) }}
                        ><span className={styles.icon}>￥</span></InputItem>
                    </div>
                    <p className={styles.nowProfit}>可提现金额￥{nowProfit && nowProfit.toFixed(2)}</p>
                    <p>提现至</p>
                </div>
                <Flex className={styles.cardContainer}>
                    {
                        commonCard.length !== 0
                        &&
                        commonCard.map(({ bank, code, id }, index) => (
                            <FlexItem
                                key={index}
                                className={classNames(styles.cardItem, bankId === id && styles.active)}
                                onClick={() => { this.changeSelectBank(id) }}
                            >
                                <h1>{bank}</h1>
                                <p>{code}</p>
                            </FlexItem>
                        ))
                    }
                    <FlexItem>
                        <div
                            className={styles.addCard}
                            onClick={() => { browserHistory.push(ROUTES.CARD_ADD) }}
                        />
                    </FlexItem>
                </Flex>
                <Button className={classNames(publicStyles.bigButton, styles.withdrawBtn)} type='primary' onClick={this.confirmWithdraw}>申请提现</Button>
                <Modal
                    transparent
                    platform='ios'
                    title='暂不可提现'
                    visible={isWithdrawing}
                    onClose={this.closeModal}
                    footer={[{
                        text: '我知道了',
                        onPress: this.closeModal,
                    }]}
                >
                    当前账户已有提现申请
                </Modal>
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(Withdrawals)
