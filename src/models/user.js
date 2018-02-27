import { browserHistory } from 'dva/router'
import STATUS from '../config/status'
import {
    fetchUserUpdateInfo,
    // fetchUserUpdatePhone,
} from '../services'

export default {
    namespace: 'user',
    state: {
        // 更换绑定手机当前步骤(废弃)
        // changePhoneStepCurrent: 0,

        // 是否展示微信弹层
        isShowWechatCode: false,

        // 是否手动关闭弹层
        isCloseWechatCode: false,
    },
    reducers: {
        // 保存更换绑定手机当前步骤(废弃)
        // changeUpdatePhoneStepCurrent(state, { changePhoneStepCurrent }) {
        //     return {
        //         ...state,
        //         changePhoneStepCurrent,
        //     }
        // },

        changeIsShowWechatCode(state, { isShowWechatCode }) {
            return {
                ...state,
                isShowWechatCode,
            }
        },

        changeIsCloseWechatCode(state, { isCloseWechatCode }) {
            return {
                ...state,
                isCloseWechatCode,
            }
        },
    },
    effects: {
        // 5.1.1 修改昵称/微信号
        *fetchUserUpdateInfo({ payload }, { call, put }) {
            const {
                response: {
                    status,
                },
            } = yield call(fetchUserUpdateInfo, payload)

            if (status === STATUS.SUCCESS) {
                yield put({
                    type: 'common/getCommonUser',
                })

                if (payload.title) {
                    browserHistory.goBack()
                }
            }
        },
        // 5.1.2 修改手机号(废弃)
        // *fetchUserUpdatePhone({ payload }, { call, put }) {
        //     const {
        //         response: {
        //             status,
        //         },
        //     } = yield call(fetchUserUpdatePhone, payload)

        //     if (status === STATUS.CHECK_OLD_PHONE_SUCCESS) {
        //         yield put({
        //             type: 'changeUpdatePhoneStepCurrent',
        //             changePhoneStepCurrent: 1,
        //         })
        //         yield put({
        //             type: 'common/saveIsGetCode',
        //             isGetCode: 0,
        //         })
        //     }
        //     else if (status === STATUS.CHECK_NEW_PHONE_SECCESS) {
        //         yield put({
        //             type: 'changeUpdatePhoneStepCurrent',
        //             changePhoneStepCurrent: 2,
        //         })
        //     }
        // },
    },
    subscriptions: {},
}
