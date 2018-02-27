import React from 'react'
import { connect } from 'dva'
import classNames from 'classnames'
import { createForm } from 'rc-form'
import {
    Toast,
    Button,
    InputItem,
} from 'antd-mobile'
import styles from './account/account.less'
import publicStyles from './public/public.less'
import { getInputItemError } from '../utils/library'

class UserPassword extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isVisible: false,
        }
    }

    changeVisiblePassword = () => {
        this.setState({
            isVisible: !this.state.isVisible,
        })
    }

    confirmUpdatePassword = () => {
        const {
            form,
            dispatch,
        } = this.props
        const opassword = form.getFieldsValue().o_password
        const password = form.getFieldsValue().password

        if (!opassword) {
            Toast.fail('请输入旧密码', 1)
            return
        }
        else if (!password) {
            Toast.fail('请设置新密码', 1)
            return
        }
        else if (password.length > 20) {
            Toast.fail('密码最长20个字符', 1)
            return
        }

        dispatch({
            type: 'account/fetchUpdatePassword',
            payload: {
                ...form.getFieldsValue(),
            },
        })
    }

    render() {
        const {
            form: {
                getFieldProps,
                getFieldError,
            },
        } = this.props

        const { isVisible } = this.state

        return (
            <div className={classNames(styles.container, styles.findpwdContainer)}>
                <p className={publicStyles.headerTitle}>修改密码</p>
                <InputItem
                    placeholder='请输入旧密码'
                    type='password'
                    className={publicStyles.iconInput}
                    {
                        ...getFieldProps('o_password')
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
                <InputItem
                    placeholder='设置新密码'
                    type={isVisible ? 'text' : 'password'}
                    className={publicStyles.iconInput}
                    {
                        ...getFieldProps('password', {
                            rules: [
                                {
                                    max: 20,
                                    message: '密码最长20个字符',
                                },
                            ],
                        })
                    }
                    {...getInputItemError(getFieldError('password'))}
                    extra={
                        <div className={classNames(publicStyles.pwdVisible, !isVisible && publicStyles.pwdNotVisible)} onClick={this.changeVisiblePassword} />
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
                <Button className={classNames(publicStyles.bigButton, styles.signBtn)} type='primary' onClick={this.confirmUpdatePassword}>确认</Button>

            </div>
        )
    }
}

export default createForm()(connect((state) => {
    return state
})(UserPassword))

