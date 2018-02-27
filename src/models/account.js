import { browserHistory } from 'dva/router'
import { setToken } from '../utils/auth'
import STATUS from '../config/status'
import ROUTES from '../config/routes'
import {
    fetchAccountSign,
    fetchFindPassword,
    fetchAccountLogin,
    fetchUpdatePassword,
} from '../services'

export default {
    namespace: 'account',
    state: {},
    reducers: {},
    effects: {
        // 2.1 登录接口
        *fetchAccountLogin({ payload }, { call }) {
            const {
                response: {
                    data,
                    status,
                },
            } = yield call(fetchAccountLogin, payload)

            if (status === STATUS.SUCCESS) {
                setToken(data.token)
                browserHistory.push(ROUTES.USER)
            }
        },

        // 2.2 注册接口
        *fetchAccountSign({ payload }, { call }) {
            const {
                response: {
                    status,
                    data,
                },
            } = yield call(fetchAccountSign, payload)

            if (status === STATUS.SUCCESS) {
                // browserHistory.push(ROUTES.LOGIN)
                setToken(data.token)
                browserHistory.push(ROUTES.USER)
            }
        },

        // 2.3 忘记密码接口
        *fetchFindPassword({ payload }, { call }) {
            const {
                response: {
                    status,
                },
            } = yield call(fetchFindPassword, payload)

            if (status === STATUS.SUCCESS) {
                browserHistory.goBack()
            }
        },

        // 2.4 修改密码接口
        *fetchUpdatePassword({ payload }, { call }) {
            const {
                response: {
                    status,
                },
            } = yield call(fetchUpdatePassword, payload)

            if (status === STATUS.SUCCESS) {
                browserHistory.goBack()
            }
        },
    },
    subscriptions: {},
}
