/* global someFunction WeixinJSBridge, wx */

import { browserHistory } from 'dva/router'
import ROUTES from '../config/routes'

export function onBridgeReady(data) {
    WeixinJSBridge.invoke(
        'getBrandWCPayRequest',
        {
            // 公众号名称，由商户传入
            appId: data.wechatPay.appId,

            // 时间戳，自1970年以来的秒数
            timeStamp: data.wechatPay.timeStamp,

            // 随机串
            nonceStr: data.wechatPay.nonceStr,

            // 统一支付接口返回的prepay_id参数值
            package: data.wechatPay.package,

            // 微信签名方式
            signType: data.wechatPay.signType,

            // 微信签名
            paySign: data.wechatPay.paySign,
        },
        (res) => {
            if (res.err_msg === 'get_brand_wcpay_request:ok') {
                // 使用以上方式判断前端返回,微信团队郑重提示：
                // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                browserHistory.push(`${ROUTES.BUY_SUCCESS}?code=${data.code}`)
            }
            else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
                browserHistory.push(`${ROUTES.BUY_FAIL}`)
            }
            else if (res.err_msg === 'get_brand_wcpay_request:fail') {
                browserHistory.push(`${ROUTES.BUY_FAIL}`)
            }
        },
   )
}

export function hideOptionMenu() {
    wx.hideOptionMenu()
}

export function closeWindow() {
    wx.closeWindow()
}

export function showMenuItems(data) {
    wx.showMenuItems({
        menuList: [
            'menuItem:share:appMessage',
            'menuItem:share:timeline',
            'menuItem:copyUrl',
        ],
    })

    wechatShare(data)
}

export function wechatShare(data) {
    const shareData = {
        ...data,
        success: () => {
            // 用户确认分享后执行的回调函数
            console.log('分享成功')
        },
        cancel: () => {
            // 用户取消分享后执行的回调函数
            console.log('取消分享')
        },
    }
    // 分享到朋友圈
    wx.onMenuShareTimeline({
        ...shareData,
    })

    // 分享给朋友
    wx.onMenuShareAppMessage({
        ...shareData,
    })
}

export function setConfig(config) {
    wx.config(config)
}
