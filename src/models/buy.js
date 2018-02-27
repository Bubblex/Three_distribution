import STATUS from '../config/status'
import ROUTES from '../config/routes'
import { fetchRechargeBuy } from '../services'
import { onBridgeReady } from '../utils/wechat'

export default {
    namespace: 'buy',
    state: {
        // 购买数量
        buyDefaultNums: 0,
    },
    reducers: {
        // 修改购买数量
        changeBuyDefaultNums(state, { buyDefaultNums }) {
            return {
                ...state,
                buyDefaultNums,
            }
        },
    },
    effects: {
        // 5.4.3 支付
        *fetchRechargeBuy({ payload }, { call }) {
            const {
                response: {
                    data,
                    status,
                },
            } = yield call(fetchRechargeBuy, payload)

            if (status === STATUS.SUCCESS) {
                // 请求支付
                if (typeof WeixinJSBridge === 'undefined') {
                    if (document.addEventListener) {
                        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
                    }
                    else if (document.attachEvent) {
                        document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
                        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
                    }
                }
                else {
                    onBridgeReady(data)
                }
            }
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === ROUTES.BUY_SUCCESS) {
                    dispatch({
                        type: 'recharge/getRechargeDetail',
                        payload: query,
                    })
                }
            })
        },
    },
}
