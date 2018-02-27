import React from 'react'
import { connect } from 'dva'
import classNames from 'classnames'
import { createForm } from 'rc-form'
import {
    Toast,
    Button,
    InputItem,
} from 'antd-mobile'
import styles from './user/user.less'
import publicStyles from './public/public.less'

class UserNickname extends React.Component {
    confirmUpdateNickname = () => {
        const {
            form,
            dispatch,
        } = this.props
        const title = form.getFieldsValue().title

        if (!title) {
            Toast.fail('请输入昵称', 1)
            return
        }
        dispatch({
            type: 'user/fetchUserUpdateInfo',
            payload: {
                title,
            },
        })
    }


    render() {
        const {
            form: {
                getFieldProps,
            },
            common: {
                commonUser: {
                    title,
                },
            },
        } = this.props

        return (
            <div className={classNames(styles.container, styles.nicknameContainer)}>
                <p className={publicStyles.headerTitle}>修改昵称</p>
                <div className={styles.changeNickname}>
                    <InputItem
                        placeholder='请输入昵称'
                        className={publicStyles.iconInput}
                        {
                            ...getFieldProps('title', {
                                initialValue: title,
                            })
                        }
                    />
                    <Button className={classNames(publicStyles.bigButton, styles.nicknameBtn)} type='primary' onClick={this.confirmUpdateNickname}>确定</Button>
                </div>
            </div>
        )
    }
}

export default createForm()(connect((state) => {
    return state
})(UserNickname))
