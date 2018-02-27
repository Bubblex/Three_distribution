import request from '../utils/request'

import { query } from '../utils/library'

import API from '../config/api'

// 1.1.1 发送验证码
export async function sendVerifyMessage(params) {
    return request(API.VERIFY_MESSAGE, {
        body: query(params),
    })
}

// 1.1.2 微信配置
export async function getCommonConfig(params) {
    return request(API.COMMON_CONFIG, {
        body: query(params),
    })
}

// 1.1.3 多客服
export async function getCommonService(params) {
    return request(API.COMMON_SERVICE, {
        body: query(params),
    })
}

// 1.2.1 等级数据
export async function getCommonLevel(params) {
    return request(API.COMMON_LEVEL, {
        body: query(params),
    })
}

// 1.2.2 个人信息数据
export async function getCommonUser(params) {
    return request(API.COMMON_USER, {
        body: query(params),
    })
}

// 1.2.3 银行卡列表数据
export async function getCommonCard(params) {
    return request(API.COMMON_CARD, {
        body: query(params),
    })
}

// 1.2.4 城市级联数据
export async function getCommonAddress(params) {
    return request(API.COMMON_ADDRESS, {
        body: query(params),
    })
}

// 2.1 登录接口
export async function fetchAccountLogin(params) {
    return request(API.ACCOUNT_LOGIN, {
        body: query(params),
    })
}

// 2.2 注册接口
export async function fetchAccountSign(params) {
    return request(API.ACCOUNT_SIGN, {
        body: query(params),
    })
}

// 2.3 忘记密码接口
export async function fetchFindPassword(params) {
    return request(API.ACCOUNT_FIND_PASSWORD, {
        body: query(params),
    })
}

// 2.4 修改密码接口
export async function fetchUpdatePassword(params) {
    return request(API.ACCOUNT_UPDATE_PASSWORD, {
        body: query(params),
    })
}

// 4.1 推荐页数据
export async function getRecommendData(params) {
    return request(API.RECOMMEND_DATA, {
        body: query(params),
    })
}

// 4.2 上传二维码
export async function fetchRecommendUpload(params) {
    return request(API.RECOMMEND_UPLOAD, {
        body: query(params),
    })
}

// 5.1.1 修改昵称/微信号
export async function fetchUserUpdateInfo(params) {
    return request(API.USER_UPDATE_INFO, {
        body: query(params),
    })
}

// 5.1.2 修改手机号（废弃）
// export async function fetchUserUpdatePhone(params) {
//     return request(API.USER_UPDATE_PHONE, {
//         body: query(params),
//     })
// }

// 5.2.1 提现
export async function fetchWithdrawalsMoney(params) {
    return request(API.WITHDRAWALS_MONEY, {
        body: query(params),
    })
}

// 5.2.2 提现列表
export async function getWithdrawalsList(params) {
    return request(API.WITHDRAWALS_LIST, {
        body: query(params),
    })
}

// 5.3.1 删除/修改默认银行卡
export async function fetchCardHandle(params) {
    return request(API.CARD_HANDLE, {
        body: query(params),
    })
}

// 5.3.2 添加银行卡
export async function fetchCardAdd(params) {
    return request(API.CARD_ADD, {
        body: query(params),
    })
}

// 5.4.1 消费列表
export async function getRechargeList(params) {
    return request(API.RECHARGE_LIST, {
        body: query(params),
    })
}

// 5.4.2 消费详情
export async function getRechargeDetail(params) {
    return request(API.RECHARGE_DETAIL, {
        body: query(params),
    })
}

// 5.4.3 支付
export async function fetchRechargeBuy(params) {
    return request(API.RECHARGE_BUY, {
        body: query(params),
    })
}

// 5.5.1 我的收益列表
export async function getProfitList(params) {
    return request(API.PROFIT_LIST, {
        body: query(params),
    })
}

// 5.5.2 近七天收益数据
export async function getProfitLine(params) {
    return request(API.PROFIT_LINE, {
        body: query(params),
    })
}

// 5.6.1 我的团队列表
export async function fetchTeamList(params) {
    return request(API.TEAM_LIST, {
        body: query(params),
    })
}

// 5.6.2 banner图
export async function fetchTeamBanner(params) {
    return request(API.PROFIT_BANNER, {
        body: query(params),
    })
}
