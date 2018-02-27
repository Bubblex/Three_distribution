import React from 'react'
import moment from 'moment'
import classNames from 'classnames'
import { browserHistory } from 'dva/router'
import {
    Flex,
    Button,
} from 'antd-mobile'
import styles from './team.less'
import ROUTES from '../../config/routes'
import publicStyles from '../public/public.less'
import { LEVEL_ID, LOWER_LEVEL } from '../../config/data-item'

const FlexItem = Flex.Item

class ListItem extends React.Component {
    render() {
        const {
            rowData: {
                created_at: createdAt,
                level_id: levelId,
                title,
                id,
            },
            type,
        } = this.props

        return (
            <Flex
                wrap='true'
                size='lg'
                className={publicStyles.viewListItem}
            >
                <FlexItem className={classNames(publicStyles.flexAutoWidth, styles.avatar)}>
                    <img
                        src={
                            levelId === LEVEL_ID.KING ? require('../public/king.png') :
                            levelId === LEVEL_ID.PRINCE ? require('../public/prince.png') :
                            levelId === LEVEL_ID.KING ? require('../public/king.png') :
                            require('../public/avatar.png')
                        }
                        alt=''
                    />
                </FlexItem>
                <FlexItem>{title}<p className={publicStyles.garyText}>注册时间：{moment(createdAt).format('YYYY/MM/DD')}</p></FlexItem>
                <FlexItem className={publicStyles.flexAutoWidth}>
                    {
                        type !== LOWER_LEVEL.THREE_NEXT
                        &&
                        <Button
                            type='primary'
                            className={publicStyles.samllButton}
                            onClick={() => {
                                browserHistory.push(`${ROUTES.TEAM_NEXT}?upper_id=${id}`)
                                document.documentElement.scrollTop = document.body.scrollTop = 0
                            }}
                        >{type === LOWER_LEVEL.ONE_NEXT ? '查看二级好友' : '查看三级好友'}</Button>
                    }
                </FlexItem>
            </Flex>
        )
    }
}

export default ListItem
