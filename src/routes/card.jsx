import React from 'react'
import { connect } from 'dva'
import { browserHistory } from 'dva/router'
import { Flex, Radio, Modal } from 'antd-mobile'
import publicStyles from './public/public.less'
import ROUTES from '../config/routes'
import styles from './card/card.less'

const FlexItem = Flex.Item
const alert = Modal.alert

class Card extends React.Component {
    saveSelectedDefaultCard = (id) => {
        const {
            dispatch,
        } = this.props

        dispatch({
            type: 'card/saveDefaultCardId',
            defaultCardId: id,
        })

        dispatch({
            type: 'card/fetchCardHandle',
            payload: {
                type: 2,
                card_id: id,
            },
        })
    }

    deleteCard = (id) => {
        alert('确认删除？', '',
            [
                { text: '取消' },
                {
                    text: '确定',
                    onPress: () => {
                        this.props.dispatch({
                            type: 'card/fetchCardHandle',
                            payload: {
                                type: 1,
                                card_id: id,
                            },
                        })
                    },
                },
            ],
        )
    }

    render() {
        const {
            common: {
                commonCard,
            },
            card: {
                defaultCardId,
            },
        } = this.props
        return (
            <div className={styles.container}>
                {
                    commonCard.map((arr, index) => (
                        <Flex className={styles.item} align='start' key={index}>
                            <FlexItem>
                                <h1>{arr.bank}</h1>
                                <p>{arr.code}</p>
                                <p>{arr.title}</p>
                                <p>{arr.phone}</p>
                            </FlexItem>
                            <FlexItem className={publicStyles.flexAutoWidth}>
                                <div className={styles.delete} onClick={() => { this.deleteCard(arr.id) }} />
                            </FlexItem>
                            <p className={styles.default} >
                                <Radio
                                    className={publicStyles.radio}
                                    checked={arr.id === defaultCardId}
                                    onChange={() => { this.saveSelectedDefaultCard(arr.id) }}
                                />设为默认提现银行卡
                            </p>
                        </Flex>
                    ))
                }
                <div
                    className={styles.addBtn} onClick={() => {
                        browserHistory.push(ROUTES.CARD_ADD)
                    }}
                >添加银行卡</div>
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(Card)
