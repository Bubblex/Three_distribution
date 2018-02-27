import { Toast } from 'antd-mobile'
import STATUS from '../config/status'
import ROUTES from '../config/routes'
import {
    getRecommendData,
    fetchRecommendUpload,
} from '../services'


export default {
    namespace: 'recommend',
    state: {
        // 推荐页数据
        recommendData: {},

        // 是否显示上传按钮
        isShowUpload: true,
    },
    reducers: {
        // 保存推荐页数据
        saveRecommendData(state, { recommendData }) {
            return {
                ...state,
                recommendData,
            }
        },

        // 修改是否显示上传按钮状态
        changeRecommendData(state, { isShowUpload }) {
            return {
                ...state,
                isShowUpload,
            }
        },
    },
    effects: {
        // 4.1 推荐页数据
        *getRecommendData({ payload }, { call, put }) {
            const {
                response: {
                    data,
                    status,
                },
            } = yield call(getRecommendData, payload)

            if (status === STATUS.SUCCESS) {
                yield put({
                    type: 'saveRecommendData',
                    recommendData: data.recommend,
                })
                yield put({
                    type: 'changeRecommendData',
                    isShowUpload: !data.recommend.image,
                })
            }
        },

        // 4.2 上传二维码
        *fetchRecommendUpload({ payload }, { call }) {
            const {
                response: {
                    status,
                },
            } = yield call(fetchRecommendUpload, payload)

            if (status === STATUS.SUCCESS) {
                Toast.success('上传成功', 1)
            }
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === ROUTES.RECOMMEND || pathname === ROUTES.RECOMMEND_SHARE) {
                    dispatch({
                        type: 'getRecommendData',
                        payload: query,
                    })
                }
            })
        },
    },
}
