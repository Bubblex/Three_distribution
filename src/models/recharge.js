import { getRechargeList, getRechargeDetail } from '../services'
import STATUS from '../config/status'
import ROUTES from '../config/routes'

export default {
    namespace: 'recharge',
    state: {
        // 消费列表
        rechargeList: [],

        // 消费列表分页
        rechargePaginate: {},

        // 消费详情
        rechargeDateil: {
            level: {},
            account: {},
        },
    },
    reducers: {
        // 保存消费列表
        saveRechargeList(state, { rechargeList, rechargePaginate }) {
            return {
                ...state,
                rechargeList,
                rechargePaginate,
            }
        },

        // 清除消费列表
        removeRechargeList(state) {
            return {
                ...state,
                rechargeList: [],
                rechargePaginate: {},
            }
        },

        // 保存消费详情
        saveRechargeDetail(state, { rechargeDateil }) {
            return {
                ...state,
                rechargeDateil,
            }
        },
    },
    effects: {
        // 5.4.1 消费列表
        *getRechargeList({ payload }, { call, put }) {
            const {
                response: {
                    data,
                    status,
                },
            } = yield call(getRechargeList, payload)

            if (status === STATUS.SUCCESS) {
                yield put({
                    type: 'saveRechargeList',
                    rechargeList: data.list,
                    rechargePaginate: data.paginate,
                })
            }
        },

        // 5.4.2 消费详情
        *getRechargeDetail({ payload }, { call, put }) {
            const {
                response: {
                    data,
                    status,
                },
            } = yield call(getRechargeDetail, payload)

            if (status === STATUS.SUCCESS) {
                yield put({
                    type: 'saveRechargeDetail',
                    rechargeDateil: data,
                })
            }
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === ROUTES.RECHARGE_DETAIL) {
                    dispatch({
                        type: 'getRechargeDetail',
                        payload: query,
                    })
                }
            })
        },
    },
}
