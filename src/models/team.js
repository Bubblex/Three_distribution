import ROUTES from '../config/routes'
import STATUS from '../config/status'
import { fetchTeamList, fetchTeamBanner } from '../services'

export default {
    namespace: 'team',
    state: {
        // 我的团队列表
        teamList: [],

        // 我的团队列表分页
        teamPaginate: {},

        // 团队banner图
        teamBanner: [],

        // 上级信息
        teamAccount: {},
    },
    reducers: {
        // 保存我的团队列表
        saveTeamList(state, { teamList, teamAccount, teamPaginate }) {
            return {
                ...state,
                teamList,
                teamAccount,
                teamPaginate,
            }
        },

        // 清空我的团队列表
        removeTeamList(state) {
            return {
                ...state,
                teamList: [],
                teamAccount: {},
                teamPaginate: {},
            }
        },

        // 保存团队banner图
        saveTeamBanner(state, { teamBanner }) {
            return {
                ...state,
                teamBanner,
            }
        },
    },
    effects: {
        // 5.6.1 我的团队列表
        *fetchTeamList({ payload }, { call, put }) {
            const {
                response: {
                    data,
                    status,
                },
            } = yield call(fetchTeamList, payload)

            if (status === STATUS.SUCCESS) {
                yield put({
                    type: 'saveTeamList',
                    teamList: data.list,
                    teamPaginate: data.paginate,
                    teamAccount: data.account || { type: 1 },
                })
            }
        },

        // 5.6.2 banner图
        *fetchTeamBanner({ payload }, { call, put }) {
            const {
                response: {
                    data,
                    status,
                },
            } = yield call(fetchTeamBanner, payload)

            if (status === STATUS.SUCCESS) {
                yield put({
                    type: 'saveTeamBanner',
                    teamBanner: data.list,
                })
            }
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === ROUTES.TEAM) {
                    dispatch({
                        type: 'fetchTeamList',
                        payload: {
                            ...query,
                            page: 1,
                        },
                    })
                    dispatch({
                        type: 'fetchTeamBanner',
                    })
                }
                else if (pathname === ROUTES.TEAM_NEXT) {
                    dispatch({
                        type: 'fetchTeamList',
                        payload: {
                            ...query,
                            page: 1,
                        },
                    })
                }
            })
        },
    },
}
