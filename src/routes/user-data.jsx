import React from 'react'
import { connect } from 'dva'
import classNames from 'classnames'
import { browserHistory } from 'dva/router'
import {
    List,
    Modal,
    Toast,
} from 'antd-mobile'
import publicStyles from './public/public.less'
import { LEVEL_ID } from '../config/data-item'
import { delToken } from '../utils/auth'
import styles from './user/user.less'
import ROUTES from '../config/routes'

const ListItem = List.Item
const alert = Modal.alert
const prompt = Modal.prompt

class UserData extends React.Component {
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

    sumbitWechatCode = () => {
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

    exitAccount = () => {
        alert('确认退出账号？', '',
            [
                { text: '取消' },
                {
                    text: '确定',
                    onPress: () => {
                        delToken()
                        browserHistory.push(ROUTES.LOGIN)
                    },
                },
            ],
        )
    }

    render() {
        const {
            common: {
                commonUser: {
                    title,
                    phone,
                    wechat_code: wechat,
                    level: {
                        id: accountLevelId,
                        title: levelTitle,
                    },
                    address,
                    province,
                    city,
                    county,
                },
            },
        } = this.props

        return (
            <div className={styles.container}>
                <div className={publicStyles.avatarTop}>
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
                        <span>{levelTitle}</span>
                    </div>
                </div>
                <List className={classNames(publicStyles.list, styles.list)}>
                    <ListItem extra={phone} >手机号</ListItem>
                    <ListItem
                        extra={wechat || <a href='javascript:' onClick={this.sumbitWechatCode}>请填写您的微信号</a>}
                    >微信号</ListItem>
                    <ListItem arrow='horizontal' extra={title} onClick={() => { browserHistory.push(ROUTES.USER_NICKNAME) }}>昵称</ListItem>
                    <ListItem arrow='horizontal' onClick={() => { browserHistory.push(ROUTES.USER_PASSWORD) }}>修改密码</ListItem>
                    {
                        address != null
                        &&
                        <ListItem wrap='true' extra={`${province}${city}${county}${address}`} >收货地址</ListItem>
                    }
                </List>
                <p className={styles.exitBtn} onClick={this.exitAccount}>退出登录</p>
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(UserData)
