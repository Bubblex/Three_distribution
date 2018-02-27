import React from 'react'
import { browserHistory } from 'dva/router'
import {
    Flex,
    Button,
} from 'antd-mobile'
import moment from 'moment'
import classNames from 'classnames'
import styles from './profit.less'
import ROUTES from '../../config/routes'
import publicStyles from '../public/public.less'
import { LOWER_LEVEL } from '../../config/data-item'

const FlexItem = Flex.Item

class ListItem extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isShowDetail: false,
        }
    }

    changeState = (state) => {
        this.setState({
            isShowDetail: state,
        })
    }

    render() {
        const {
            rowData: {
                baccount: {
                    id,
                    title,
                },
                level: {
                    title: levelTitle,
                },
                nums,
                profit,
                unit_price: unitPrice,
                created_at: createdAt,
            },
            type,
        } = this.props

        const isShowDetail = this.state.isShowDetail

        return (
            <Flex
                wrap='true'
                size='lg'
                align='start'
                className={publicStyles.viewListItem}
            >
                <FlexItem>
                    <p className={styles.text}>用户：{title}</p>
                    <p className={styles.text}>佣金：{profit && profit.toFixed(2)}</p>
                    {
                        isShowDetail
                        &&
                        <div>
                            <p className={styles.text}>单价：{unitPrice && unitPrice.toFixed(2)}</p>
                            <p className={styles.text}>数量：{nums}</p>
                            <p className={styles.text}>好友等级：{levelTitle}</p>
                        </div>
                    }
                    <p className={publicStyles.garyText}>{moment(createdAt).format('YYYY/MM/DD')}</p>
                </FlexItem>
                <FlexItem className={publicStyles.flexAutoWidth}>
                    {
                        type !== LOWER_LEVEL.THREE_NEXT
                        &&
                        <Button
                            type='primary'
                            className={publicStyles.samllButton}
                            onClick={() => {
                                browserHistory.push(`${ROUTES.PROFIT_NEXT}?upper_id=${id}`)
                                document.documentElement.scrollTop = document.body.scrollTop = 0
                            }}
                        >{type === LOWER_LEVEL.ONE_NEXT ? '查看二级好友' : '查看三级好友'}</Button>
                    }
                    { !isShowDetail && <p onClick={() => { this.changeState(true) }} className={classNames(styles.detail, styles.action)}>详情</p> }
                    { isShowDetail && <p onClick={() => { this.changeState(false) }} className={classNames(styles.close, styles.action)}>收起</p> }
                </FlexItem>
            </Flex>
        )
    }
}

export default ListItem
