import { Toast } from 'antd-mobile'
import STATUS from '../config/status'
import ROUTES from '../config/routes'
import {
    getCommonUser,
    getCommonCard,
    getCommonLevel,
    getCommonConfig,
    getCommonService,
    getCommonAddress,
    sendVerifyMessage,
} from '../services'
import { PHONE_CODE_SECOND } from '../config/data-item'
import { setConfig, closeWindow, showMenuItems } from '../utils/wechat'

export default {
    namespace: 'common',
    state: {
        // 是否获取过验证码 0：未获取过 1：已获取
        isGetCode: false,

        // 是否正在获取验证码 0：待获取 1：正在获取
        isGetingCode: false,

        // 倒计时
        second: PHONE_CODE_SECOND,

        // 等级数据
        commonLevel: [],

        // 用户信息
        commonUser: {
            level: {},
            info: {},
        },

        // 银行卡列表
        commonCard: [],

        // 微信配置
        config: {},

        // 城市级联
        commonAddress: [],

        // 选中省id
        provinceId: '',

        // 选中市id
        cityId: '',

        // 选中区id
        countyId: '',
    },
    reducers: {
        // 保存是否获取过验证码状态值
        saveIsGetCode(state, { isGetCode }) {
            return {
                ...state,
                isGetCode,
            }
        },

        // 保存是否正在获取验证码状态值
        saveIsGetingCode(state, { isGetingCode }) {
            return {
                ...state,
                isGetingCode,
            }
        },

        // 保存倒计时秒数
        changeSecond(state, { second }) {
            return {
                ...state,
                second,
            }
        },

        // 保存等级数据
        saveCommonLevel(state, { commonLevel }) {
            return {
                ...state,
                commonLevel,
            }
        },

        // 保存用户信息
        saveCommonUser(state, { commonUser }) {
            return {
                ...state,
                commonUser,
            }
        },

        // 保存银行卡信息
        saveCommonCard(state, { commonCard }) {
            return {
                ...state,
                commonCard,
            }
        },

        // 保存微信配置
        saveWechatConfig(state, { config }) {
            return {
                ...state,
                config,
            }
        },

        // 保存城市级联
        saveCommonAddress(state, { commonAddress }) {
            return {
                ...state,
                commonAddress,
            }
        },

        // 保存地址选中id
        saveSelectAddressId(state, { cityId, countyId, provinceId }) {
            return {
                ...state,
                cityId,
                countyId,
                provinceId,
            }
        },

    },
    effects: {
        // 1.1.1 发送验证码
        *sendVerifyMessage({ payload }, { call, put }) {
            const {
                response: {
                    status,
                    message,
                },
            } = yield call(sendVerifyMessage, payload)

            if (status === STATUS.SUCCESS) {
                yield put({
                    type: 'saveIsGetCode',
                    isGetCode: true,
                })
                yield put({
                    type: 'saveIsGetingCode',
                    isGetingCode: true,
                })
            }
            else if (status === STATUS.FAIL) {
                Toast.fail(message, 1)
            }
        },

        // 1.2.1 等级数据
        *getCommonLevel({ payload }, { call, put }) {
            const {
                response: {
                    data,
                    status,
                },
            } = yield call(getCommonLevel, payload)

            if (status === STATUS.SUCCESS) {
                yield put({
                    type: 'saveCommonLevel',
                    commonLevel: data.level,
                })

                yield put({
                    type: 'buy/changeBuyDefaultNums',
                    buyDefaultNums: data.level[3].nums,
                })
            }
        },

        // 1.2.2 个人信息数据
        *getCommonUser({ payload }, { call, put }) {
            const {
                response: {
                    data,
                    status,
                },
            } = yield call(getCommonUser, payload)

            if (status === STATUS.SUCCESS) {
                yield put({
                    type: 'saveCommonUser',
                    commonUser: data.account,
                })

                yield put({
                    type: 'saveSelectAddressId',
                    provinceId: data.account.province_id || '',
                    cityId: data.account.city_id || '',
                    countyId: data.account.county_id || '',
                })

                if (data.account.wechat_code) {
                    yield put({
                        type: 'user/changeIsShowWechatCode',
                        isShowWechatCode: false,
                    })
                }
                else {
                    yield put({
                        type: 'user/changeIsShowWechatCode',
                        isShowWechatCode: true,
                    })
                }
            }
        },

        // 1.2.3 银行卡列表数据
        *getCommonCard({ payload }, { call, put }) {
            const {
                response: {
                    data,
                    status,
                },
            } = yield call(getCommonCard, payload)

            if (status === STATUS.SUCCESS) {
                yield put({
                    type: 'saveCommonCard',
                    commonCard: data.cards,
                })

                const statusArr = []
                for (const arr of data.cards) {
                    statusArr.push(arr.status)
                }

                if (data.cards.length !== 0) {
                    if (statusArr.indexOf(1) !== -1) {
                        yield put({
                            type: 'withdrawals/saveBankId',
                            bankId: data.cards[statusArr.indexOf(1)].id,
                        })

                        yield put({
                            type: 'card/saveDefaultCardId',
                            defaultCardId: data.cards[statusArr.indexOf(1)].id,
                        })
                    }
                }
            }
        },

        // 1.1.2 微信配置
        *getCommonConfig({ payload }, { call, put }) {
            const {
                response: {
                    data,
                    status,
                },
            } = yield call(getCommonConfig, payload)

            if (status === STATUS.SUCCESS) {
                setConfig(data)
                yield put({
                    type: 'saveWechatConfig',
                    config: data.config,
                })

                const {
                    search,
                    origin,
                    pathname,
                } = window.location

                if (pathname === ROUTES.RECOMMEND) {
                    const shareData = {
                        title: '加入阿狸扫呗，人脉就是钱脉。',
                        desc: '阿狸扫呗－专业移动收款工具，手机变身POS机，安全／快捷／费率低，分享还能赚钱！',
                        link: origin + ROUTES.RECOMMEND_SHARE + search,
                        imgUrl: origin + require('../routes/public/share.png'),
                    }

                    showMenuItems(shareData)
                }
            }
        },

        // 1.1.3 多客服
        *getCommonService({ payload }, { call }) {
            const {
                response: {
                    status,
                },
            } = yield call(getCommonService, payload)

            if (status === STATUS.SUCCESS) {
                closeWindow()
            }
        },

        // 1.2.4 城市级联数据
        *getCommonAddress({ payload }, { call, put }) {
            const {
                response: {
                    status,
                    data,
                },
            } = yield call(getCommonAddress, payload)

            if (status === STATUS.SUCCESS) {
                yield put({
                    type: 'saveCommonAddress',
                    commonAddress: data.address,
                })
            }
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                dispatch({
                    type: 'user/changeIsShowWechatCode',
                    isShowWechatCode: false,
                })
                if (pathname === ROUTES.HOME) {
                    dispatch({
                        type: 'getCommonLevel',
                    })
                    dispatch({
                        type: 'getCommonUser',
                    })
                    dispatch({
                        type: 'getCommonCard',
                    })
                }
                else if ((pathname === ROUTES.TEAM) ||
                    (pathname === ROUTES.PROFIT) ||
                    (pathname === ROUTES.USER) ||
                    (pathname === ROUTES.TEAM_NEXT) ||
                    (pathname === ROUTES.USER_NICKNAME) ||
                    (pathname === ROUTES.USER_DATA) ||
                    (pathname === ROUTES.PROFIT_NEXT)
                ) {
                    dispatch({
                        type: 'getCommonLevel',
                    })
                    dispatch({
                        type: 'getCommonUser',
                    })
                }
                else if (pathname === ROUTES.BUY) {
                    dispatch({
                        type: 'getCommonAddress',
                    })
                    dispatch({
                        type: 'getCommonLevel',
                    })
                    dispatch({
                        type: 'getCommonUser',
                    })
                }
                else if ((pathname === ROUTES.RECHARGE) ||
                    (pathname === ROUTES.WITHDRAWALS_HISTORY) ||
                    (pathname === ROUTES.PROFIT_LINE)
                ) {
                    dispatch({
                        type: 'getCommonUser',
                    })
                }
                else if (pathname === ROUTES.WITHDRAWALS) {
                    dispatch({
                        type: 'getCommonUser',
                    })
                    dispatch({
                        type: 'getCommonCard',
                    })
                }
                dispatch({
                    type: 'getCommonConfig',
                    payload: {
                        url: window.location.href,
                    },
                })
            })
        },
    },
}
