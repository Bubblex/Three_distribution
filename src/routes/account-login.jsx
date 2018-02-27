import React from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import classNames from 'classnames'
import { createForm } from 'rc-form'
import {
    Toast,
    Button,
    InputItem,
} from 'antd-mobile'
import ROUTES from '../config/routes'
import styles from './account/account.less'
import publicStyles from './public/public.less'

class AccountLogin extends React.Component {
    confirmLogin = () => {
        const {
            form,
            dispatch,
        } = this.props
        const phone = form.getFieldsValue().phone
        const password = form.getFieldsValue().password

        if (!phone) {
            Toast.fail('请输入手机号码', 1)
            return
        }
        else if (!(/^1[0-9]{10}$/.test(phone))) {
            Toast.fail('手机格式不正确', 1)
            return
        }
        else if (!password) {
            Toast.fail('请输入密码', 1)
            return
        }

        dispatch({
            type: 'account/fetchAccountLogin',
            payload: {
                ...form.getFieldsValue(),
            },
        })
    }

    render() {
        const {
            form: {
                getFieldProps,
            },
        } = this.props
        return (
            <div className={classNames(styles.container, styles.loginContainer)}>
                <div className={styles.title}>
                    <h1>登录阿狸扫呗合伙人</h1>
                    <p>SIGN IN</p>
                </div>
                <div className={styles.loginContent}>
                    <InputItem
                        placeholder='请输入手机号码'
                        className={publicStyles.iconInput}
                        {
                            ...getFieldProps('phone')
                        }
                    >
                        <div
                            style={{
                                backgroundImage: `url(${require('./public/phone.png')})`,
                                backgroundSize: 'cover',
                                height: '36px',
                                width: '25px',
                            }}
                        />
                    </InputItem>
                    <InputItem
                        placeholder='请输入密码'
                        type='password'
                        className={publicStyles.iconInput}
                        {
                            ...getFieldProps('password')
                        }
                    >
                        <div
                            style={{
                                backgroundImage: `url(${require('./public/pwd.png')})`,
                                backgroundSize: 'cover',
                                height: '32px',
                                width: '25px',
                            }}
                        />
                    </InputItem>
                </div>
                <Button className={classNames(publicStyles.bigButton, styles.signBtn)} type='primary' onClick={this.confirmLogin}>确定</Button>
                <div className={styles.bottomSign}><Link to={ROUTES.FIND_PASSWORD}>忘记密码？</Link><Link to={ROUTES.SIGN}>快速注册</Link></div>
            </div>
        )
    }
}

export default createForm()(connect((state) => {
    return state
})(AccountLogin))
