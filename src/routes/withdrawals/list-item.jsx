import React from 'react'
import moment from 'moment'
import { Flex } from 'antd-mobile'
import classNames from 'classnames'
import styles from './list-item.less'
import publicStyles from '../public/public.less'
import { WITHDRAW_STATUE_MAP, WITHDRAW_STATUE } from '../../config/data-item'

const FlexItem = Flex.Item

class ListItem extends React.Component {
    render() {
        const {
            rowData: {
                code,
                info,
                price,
                status,
                card_code: cardCode,
                created_at: createdAt,
            },
        } = this.props

        return (
            <Flex
                wrap='true'
                size='lg'
                align='start'
                className={classNames(publicStyles.viewListItem, styles.listItem)}
            >
                <FlexItem>
                    <p className={styles.text}>银行卡 {cardCode}</p>
                    <p className={styles.text}>订单号 {code}</p>
                    <p className={publicStyles.garyText}>{moment(createdAt).format('YYYY/MM/DD')}</p>
                    { status === 3 && <p className={styles.info}>备注说明：{info}</p> }
                </FlexItem>
                <FlexItem className={publicStyles.flexAutoWidth}>
                    <p className={styles.price}>￥<span>{price}</span></p>
                    <p className={classNames(styles.status, status === WITHDRAW_STATUE.ING ? styles.ing : status === WITHDRAW_STATUE.FAIL ? styles.fail : '')}>
                        {WITHDRAW_STATUE_MAP[status]}
                    </p>
                </FlexItem>
            </Flex>
        )
    }
}

export default ListItem
