import { getProfitList, getProfitLine } from '../services'
import STATUS from '../config/status'
import ROUTES from '../config/routes'

export default {
    namespace: 'profit',
    state: {
        // 我的收益列表
        profitList: [],

        // 我的收益列表分页
        profitPaginate: {},

        // 上级信息
        profitAccount: {},

        // 近7天数据
        profitLine: [],
    },
    reducers: {
        // 保存我的收益列表
        saveProfitList(state, { profitList, profitAccount, profitPaginate }) {
            return {
                ...state,
                profitList,
                profitAccount,
                profitPaginate,
            }
        },

        // 清空我的收益列表
        removeProfitList(state) {
            return {
                ...state,
                profitList: [],
                profitAccount: {},
                profitPaginate: {},
            }
        },

        // 保存近7数据
        saveProfitLine(state, { profitLine }) {
            return {
                ...state,
                profitLine,
            }
        },

    },
    effects: {
        // 5.5.1 我的收益列表
        *getProfitList({ payload }, { call, put }) {
            const {
                response: {
                    data,
                    status,
                },
            } = yield call(getProfitList, payload)

            if (status === STATUS.SUCCESS) {
                yield put({
                    type: 'saveProfitList',
                    profitList: data.list,
                    profitPaginate: data.paginate,
                    profitAccount: data.account || {},
                })
            }
        },

        // 5.5.2 近七天收益数据
        *getProfitLine({ payload }, { call, put }) {
            const {
                response: {
                    data,
                    status,
                },
            } = yield call(getProfitLine, payload)

            if (status === STATUS.SUCCESS) {
                yield put({
                    type: 'saveProfitLine',
                    profitLine: data.data,
                })
            }
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if ((pathname === ROUTES.PROFIT || (pathname === ROUTES.PROFIT_NEXT))) {
                    dispatch({
                        type: 'getProfitList',
                        payload: {
                            ...query,
                            page: 1,
                        },
                    })
                }
                else if (pathname === ROUTES.PROFIT_LINE) {
                    dispatch({
                        type: 'getProfitLine',
                    })
                }
            })
        },
    },
}
