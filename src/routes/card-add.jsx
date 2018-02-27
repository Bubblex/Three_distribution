import React from 'react'
import { connect } from 'dva'
import classNames from 'classnames'
import { createForm } from 'rc-form'
import {
    Toast,
    Button,
    Checkbox,
    InputItem,
} from 'antd-mobile'
import styles from './card/card.less'
import publicStyles from './public/public.less'

const AgreeItem = Checkbox.AgreeItem

class CardAdd extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            status: 2,
        }
    }

    onChange = (e) => {
        this.setState({
            status: e.target.checked ? 1 : 2,
        })
    }

    confirmAdd = () => {
        const {
            form,
            dispatch,
        } = this.props

        const {
            title,
            phone,
            bank,
            code,
        } = form.getFieldsValue()

        if (!title) {
            Toast.fail('请输入开户人', 1)
            return
        }
        else if (!(/[\u4e00-\u9fa5]/.test(title))) {
            Toast.fail('开户人格式不正确', 1)
            return
        }
        else if (!phone) {
            Toast.fail('请输入手机号', 1)
            return
        }
        else if (!(/^1[0-9]{10}$/.test(phone))) {
            Toast.fail('手机格式不正确', 1)
            return
        }
        else if (!bank) {
            Toast.fail('请输入开户银行', 1)
            return
        }
        else if (!(/[\u4e00-\u9fa5]/.test(bank))) {
            Toast.fail('开户银行格式不正确', 1)
            return
        }
        else if (!code) {
            Toast.fail('请输入银行卡号', 1)
            return
        }

        dispatch({
            type: 'card/fetchCardAdd',
            payload: {
                ...form.getFieldsValue(),
                status: this.state.status,
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
            <div className={styles.addContainer}>
                <h1>添加银行卡</h1>
                <InputItem
                    placeholder='请填写'
                    className={classNames(publicStyles.iconInput, styles.input)}
                    {
                        ...getFieldProps('title')
                    }
                >开户人</InputItem>
                <InputItem
                    placeholder='请填写'
                    className={classNames(publicStyles.iconInput, styles.input)}
                    {
                        ...getFieldProps('phone')
                    }
                >手机号</InputItem>
                <InputItem
                    placeholder='请填写'
                    className={classNames(publicStyles.iconInput, styles.input)}
                    {
                        ...getFieldProps('bank')
                    }
                >开户银行</InputItem>
                <InputItem
                    type='bankCard'
                    placeholder='请填写'
                    className={classNames(publicStyles.iconInput, styles.input)}
                    {
                        ...getFieldProps('code')
                    }
                >银行卡号</InputItem>
                <AgreeItem onChange={(e) => { this.onChange(e) }}>设为默认提现银行卡</AgreeItem>
                <Button className={classNames(publicStyles.bigButton, styles.confirmSaveBtn)} type='primary' onClick={this.confirmAdd}>保存</Button>
            </div>
        )
    }
}

export default createForm()(connect((state) => {
    return state
})(CardAdd))
