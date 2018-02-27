import { browserHistory } from 'dva/router'
import STATUS from '../config/status'
import ROUTES from '../config/routes'
import {
    getWithdrawalsList,
    fetchWithdrawalsMoney,
} from '../services'

export default {
    namespace: 'withdrawals',
    state: {
        // 提现列表
        withdrawalsList: [],

        // 提现列表分页
        withdrawalsPaginate: {},

        // 提现金额
        price: '',

        // 选中银行卡id
        bankId: '',

        // 提现状态 1 提现中 2 提现成功 3 提现失败
        withdrawalsListType: 1,

        // 已有提现
        isWithdrawing: false,
    },
    reducers: {
        // 保存提现列表
        saveWithdrawalsList(state, { withdrawalsList, withdrawalsPaginate }) {
            return {
                ...state,
                withdrawalsList,
                withdrawalsPaginate,
            }
        },

        // 保存提现金额
        savePrice(state, { price }) {
            return {
                ...state,
                price,
            }
        },

        // 保存选中银行卡id
        saveBankId(state, { bankId }) {
            return {
                ...state,
                bankId,
            }
        },

        // 保存提现状态
        changeWithdrawalsListType(state, { withdrawalsListType }) {
            return {
                ...state,
                withdrawalsListType,
            }
        },

        // 保存已有提现状态
        changeIsWithdrawing(state, { isWithdrawing }) {
            return {
                ...state,
                isWithdrawing,
            }
        },

        // 移除提现列表页数据
        removeWithdrawalsList(state) {
            return {
                ...state,
                withdrawalsList: [],
                withdrawalsPaginate: {},
            }
        },

    },
    effects: {
        // 5.2.1 提现
        *fetchWithdrawalsMoney({ payload, Toast }, { call, put }) {
            const {
                response: {
                    status,
                },
            } = yield call(fetchWithdrawalsMoney, payload)

            if (status === STATUS.SUCCESS) {
                browserHistory.push(ROUTES.WITHDRAWALS_HISTORY)
            }
            else if (status === STATUS.WITNDRAW_FAIL) {
                Toast.hide()
                yield put({
                    type: 'changeIsWithdrawing',
                    isWithdrawing: true,
                })
            }
        },

        // 5.2.2 提现列表
        *getWithdrawalsList({ payload }, { call, put }) {
            const {
                response: {
                    data,
                    status,
                },
            } = yield call(getWithdrawalsList, payload)

            if (status === STATUS.SUCCESS) {
                yield put({
                    type: 'saveWithdrawalsList',
                    withdrawalsList: data.list,
                    withdrawalsPaginate: data.paginate,
                })
            }
        },
    },
    subscriptions: {},
}
