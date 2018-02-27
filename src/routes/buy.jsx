import React from 'react'
import { connect } from 'dva'
import Cookies from 'js-cookie'
import classNames from 'classnames'
import { createForm } from 'rc-form'
import {
    Flex,
    List,
    Toast,
    Button,
    Picker,
    InputItem,
} from 'antd-mobile'
import styles from './buy/buy.less'
import publicStyles from './public/public.less'

const FlexItem = Flex.Item
const ListItem = List.Item

class Buy extends React.Component {
    onBlurLevel = (nums) => {
        if (!nums || nums == 0) {
            this.props.dispatch({
                type: 'buy/changeBuyDefaultNums',
                buyDefaultNums: 1,
            })
        }
    }

    changeLevel = (nums) => {
        this.props.dispatch({
            type: 'buy/changeBuyDefaultNums',
            buyDefaultNums: nums,
        })
    }

    confirmPay = () => {
        const {
            form,
            buy: {
                buyDefaultNums,
            },
            common: {
                provinceId: province,
                cityId: city,
                countyId: county,
            },
            dispatch,
        } = this.props
        const phone = form.getFieldsValue().phone
        const address = form.getFieldsValue().address

        if (!phone) {
            Toast.fail('请输入手机号', 1)
            return
        }
        else if (!(/^1[0-9]{10}$/.test(phone))) {
            Toast.fail('手机格式不正确', 1)
            return
        }
        else if (buyDefaultNums > 100000) {
            Toast.fail('超出交易金额，请分批购买', 1)
            return
        }
        else if (!province) {
            Toast.fail('请输入收货地址', 1)
            return
        }
        else if (!address) {
            Toast.fail('请输入详细地址', 1)
            return
        }

        dispatch({
            type: 'buy/fetchRechargeBuy',
            payload: {
                city,
                phone,
                county,
                address,
                type: 1,
                province,
                nums: buyDefaultNums,
                user_openid: Cookies.get('user_openid'),
            },
        })
    }

    selectAddress = (val) => {
        const { dispatch } = this.props
        dispatch({
            type: 'common/saveSelectAddressId',
            provinceId: val[0],
            cityId: val[1],
            countyId: val[2],
        })
    }

    render() {
        const {
            common: {
                commonUser: {
                    level: {
                        title: levelTitle,
                        discount,
                    },
                    phone,
                    title,
                    address,
                },
                provinceId,
                cityId,
                countyId,
                commonLevel,
                commonAddress,
            },
            buy: {
                buyDefaultNums,
            },
            form: {
                getFieldProps,
            },
        } = this.props

        // 购买数量
        const nums = buyDefaultNums
        const hasLevel = commonLevel.length !== 0
        // 达到国王合伙人
        const buyLingLevel = hasLevel && nums >= commonLevel[3].nums
        // 达到王子合伙人
        const buyPrinceLevel = (hasLevel && nums < commonLevel[3].nums && nums >= commonLevel[2].nums)
        // 达到爵士合伙人
        const buyJazzLevel = (hasLevel && nums < commonLevel[2].nums && nums >= commonLevel[1].nums)
        // 合计金额
        const allPrice = hasLevel ? (nums * commonLevel[0].unit_price).toFixed(2) : 0
        // 实付金额
        const rightPrice = (discount * allPrice).toFixed(2)
        // 折扣金额
        const discountPrice = ((1 - discount) * allPrice).toFixed(2)

        const hasAddress = commonAddress.length !== 0 && provinceId && cityId && countyId

        const provinceIdArray = []
        const cityIdArray = []
        const countyIdArray = []

        if (hasAddress) {
            for (const { value } of commonAddress) {
                provinceIdArray.push(value)
            }
        }
        const provinceSelectIndex = provinceIdArray.indexOf(provinceId) || 0

        if (hasAddress) {
            for (const { value } of commonAddress[provinceSelectIndex].children) {
                cityIdArray.push(value)
            }
        }
        const citySelectIndex = cityIdArray.indexOf(cityId) || 0

        if (hasAddress) {
            for (const { value } of commonAddress[provinceSelectIndex].children[citySelectIndex].children) {
                countyIdArray.push(value)
            }
        }
        const countySelectIndex = countyIdArray.indexOf(countyId) || 0

        return (
            <div className={styles.container} >
                <Flex>
                    <FlexItem
                        onClick={() => { this.changeLevel(commonLevel[1].nums) }}
                        className={classNames(styles.avatar, buyJazzLevel && styles.jazzAvatar, styles.disJazzAvatar)}>
                        <span>{hasLevel && commonLevel[1].title}</span>
                    </FlexItem>
                    <FlexItem
                        onClick={() => { this.changeLevel(commonLevel[2].nums) }}
                        className={classNames(styles.avatar, buyPrinceLevel && styles.princeAvatar, styles.disPrinceAvatar)}>
                        <span>{hasLevel && commonLevel[2].title}</span>
                    </FlexItem>
                    <FlexItem
                        onClick={() => { this.changeLevel(commonLevel[3].nums) }}
                        className={classNames(styles.avatar, buyLingLevel && styles.kingAvatar, styles.disKingAvatar)}>
                        <span>{hasLevel && commonLevel[3].title}</span>
                    </FlexItem>
                </Flex>
                <div
                    className={classNames(styles.form,
                        buyJazzLevel && styles.jazz,
                        buyPrinceLevel && styles.prince,
                        buyLingLevel && styles.king,
                    )}
                >
                    <p className={styles.nickname}><span>昵称</span><span>{title}</span></p>
                    <InputItem
                        className={styles.buyInput}
                        {
                            ...getFieldProps('phone', {
                                initialValue: phone || '',
                            })
                        }
                    >联系方式</InputItem>
                    <InputItem
                        className={styles.buyInput}
                        type='number'
                        placeholder='请输入购买数量'
                        value={buyDefaultNums}
                        onChange={(val) => { this.changeLevel(val) }}
                        onBlur={(val) => { this.onBlurLevel(val) }}
                    >购买数量</InputItem>
                    <p className={styles.tip}>(数量可手动输入)</p>
                    <Picker
                        data={commonAddress}
                        value={hasAddress && [provinceId, cityId, countyId]}
                        onChange={(val) => { this.selectAddress(val) }}
                    >
                        <List className={styles.pickerList}>
                            <ListItem
                                arrow='horizontal'
                                extra={
                                    <span>
                                        {!hasAddress && '请选择'}
                                        {hasAddress && commonAddress[provinceSelectIndex].label}
                                        {hasAddress && commonAddress[provinceSelectIndex].children[citySelectIndex].label}
                                        {hasAddress && commonAddress[provinceSelectIndex].children[citySelectIndex].children[countySelectIndex].label}
                                    </span>}
                            >
                                收货地址
                            </ListItem>
                        </List>
                    </Picker>
                    <InputItem
                        className={styles.buyInput}
                        {
                            ...getFieldProps('address', {
                                initialValue: address || '',
                            })
                        }
                    >详细地址</InputItem>
                </div>
                <List className={classNames(publicStyles.list, styles.list)}>
                    <ListItem
                        extra={<span className={styles.payLevel}>{levelTitle}</span>}
                    >合伙人等级：</ListItem>
                    <ListItem
                        extra={<span className={styles.payDiscount}>-￥{discountPrice}</span>}
                    >折扣（{discount === 1 ? 0 : discount * 10}折）：</ListItem>
                    <ListItem
                        extra={<p className={styles.payMoney}>￥<s>{allPrice}</s></p>}
                    >合计：</ListItem>
                    <ListItem
                        extra={<p className={styles.payMoney}><span>￥{rightPrice}</span></p>}
                    >实付金额：</ListItem>
                    <ListItem
                        extra={<p className={styles.payType}>微信支付</p>}
                    >支付方式：</ListItem>
                </List>
                <Button className={classNames(publicStyles.bigButton, styles.signBtn)} type='primary' onClick={this.confirmPay}>确定支付</Button>
            </div>
        )
    }
}

export default createForm()(connect((state) => {
    return state
})(Buy))
