import { browserHistory } from 'dva/router'
import ROUTES from '../config/routes'
import STATUS from '../config/status'
import {
    fetchCardAdd,
    fetchCardHandle,
} from '../services'

export default {
    namespace: 'card',
    state: {
        // 默认银行卡
        defaultCardId: '',
    },
    reducers: {
        // 保存默认银行卡id
        saveDefaultCardId(state, { defaultCardId }) {
            return {
                ...state,
                defaultCardId,
            }
        },
    },
    effects: {
        // 5.3.1 删除/修改默认银行卡
        *fetchCardHandle({ payload }, { call, put }) {
            const {
                response: {
                    status,
                },
            } = yield call(fetchCardHandle, payload)

            if (status === STATUS.SUCCESS) {
                if (payload.type === 1) {
                    yield put({
                        type: 'common/getCommonCard',
                    })
                }
            }
        },

        // // 5.3.2 添加银行卡
        *fetchCardAdd({ payload }, { call }) {
            const {
                response: {
                    status,
                },
            } = yield call(fetchCardAdd, payload)

            if (status === STATUS.SUCCESS) {
                browserHistory.goBack()
            }
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                if (pathname === ROUTES.CARD) {
                    dispatch({
                        type: 'common/getCommonCard',
                    })
                }
            })
        },
    },
}
