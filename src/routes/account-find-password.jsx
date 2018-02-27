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
import styles from './account/account.less'
import publicStyles from './public/public.less'
import { PHONE_CODE_SECOND } from '../config/data-item'
import { getInputItemError } from '../utils/library'

class AccountFindPassword extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isVisible: false,
        }
    }

    getPhoneVerificationCode = () => {
        const {
            form,
            dispatch,
        } = this.props
        const phone = form.getFieldsValue().phone

        if (!phone) {
            Toast.fail('请输入手机号', 1)
            return
        }
        else if (!(/^1[0-9]{10}$/.test(phone))) {
            Toast.fail('手机格式不正确', 1)
            return
        }

        dispatch({
            type: 'common/sendVerifyMessage',
            payload: {
                phone,
                type: 2,
            },
        })

        this.timer = setInterval(() => {
            const {
                common: {
                    second,
                },
            } = this.props

            dispatch({
                type: 'common/changeSecond',
                second: second - 1,
            })
            if (second <= 1) {
                dispatch({
                    type: 'common/changeSecond',
                    second: PHONE_CODE_SECOND,
                })
                clearInterval(this.timer)
                dispatch({
                    type: 'common/saveIsGetingCode',
                    isGetingCode: false,
                })
            }
        }, 1000)
    }

    changeVisiblePassword = () => {
        this.setState({
            isVisible: !this.state.isVisible,
        })
    }

    confirmFindPassword = () => {
        const {
            form,
            dispatch,
            common: {
                isGetCode,
            },
        } = this.props
        const codeCheck = form.getFieldsValue().code_check
        const password = form.getFieldsValue().password

        if (!isGetCode) {
            Toast.fail('请获取验证码', 1)
            return
        }
        else if (!codeCheck) {
            Toast.fail('请输入验证码', 1)
            return
        }
        else if (!password) {
            Toast.fail('请输入密码', 1)
            return
        }
        else if (password.length > 20) {
            Toast.fail('密码最长20个字符', 1)
            return
        }

        dispatch({
            type: 'account/fetchFindPassword',
            payload: {
                ...form.getFieldsValue(),
            },
        })

        // 清空计时器
        dispatch({
            type: 'common/changeSecond',
            second: PHONE_CODE_SECOND,
        })
        clearInterval(this.timer)
        dispatch({
            type: 'common/saveIsGetingCode',
            isGetingCode: false,
        })
    }

    render() {
        const {
            form: {
                getFieldProps,
                getFieldError,
            },
            common: {
                second,
                isGetingCode,
            },
        } = this.props

        const { isVisible } = this.state

        return (
            <div className={classNames(styles.container, styles.findpwdContainer)}>
                <p className={publicStyles.headerTitle}>找回密码</p>
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
                    placeholder='请输入手机验证码'
                    className={publicStyles.iconInput}
                    {
                        ...getFieldProps('code_check')
                    }
                    extra={
                        <div className={styles.getCode}>
                            <span>|</span>
                            {
                                isGetingCode
                                &&
                                <span>{second}秒后重发</span>
                            }
                            {
                                !isGetingCode
                                &&
                                <Link onClick={this.getPhoneVerificationCode}>发送验证码</Link>
                            }
                        </div>
                    }
                >
                    <div
                        style={{
                            backgroundImage: `url(${require('./public/phone-code.png')})`,
                            backgroundSize: 'cover',
                            height: '36px',
                            width: '25px',
                        }}
                    />
                </InputItem>
                <InputItem
                    placeholder='请设置密码'
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
                <Button className={classNames(publicStyles.bigButton, styles.signBtn)} type='primary' onClick={this.confirmFindPassword}>确认</Button>

            </div>
        )
    }
}

export default createForm()(connect((state) => {
    return state
})(AccountFindPassword))
