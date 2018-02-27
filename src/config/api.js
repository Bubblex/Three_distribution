/**
 * 接口统一前缀
 * @type {string}
 */
const PREFIX = '/api'

// 1 通用模块
const COMMON = '/common'

// 2 账号模块
const ACCOUNT = '/account'

// 3 购买模块
// const BUY = '/buy'

// 4 推荐模块
const RECOMMEND = '/recommend'

// 5.1 个人信息模块
const USER = '/user'

// 5.2 提现模块
const WITHDRAWALS = '/withdrawals'

// 5.3 银行卡模块
const CARD = '/card'

// 5.4 消费模块
const RECHARGE = '/recharge'

// 5.5 收益模块
const PROFIT = '/profit'

// 5.6 团队模块
const TEAM = '/team'

export default {
    // 1.1.1 发送验证码
    VERIFY_MESSAGE: `${PREFIX}/verify/message`,

    // 1.1.2 微信配置
    COMMON_CONFIG: `${PREFIX}${COMMON}/config`,

    // 1.1.3 多客服
    COMMON_SERVICE: `${PREFIX}${COMMON}/service`,

    // 1.2.1 等级数据
    COMMON_LEVEL: `${PREFIX}${COMMON}/level`,

    // 1.2.2 个人信息数据
    COMMON_USER: `${PREFIX}${COMMON}/user`,

    // 1.2.3 银行卡列表数据
    COMMON_CARD: `${PREFIX}${COMMON}/card`,

    // 1.2.4 城市级联数据
    COMMON_ADDRESS: `${PREFIX}${COMMON}/address`,

    // 2.1 登录接口
    ACCOUNT_LOGIN: `${PREFIX}${ACCOUNT}/login`,

    // 2.2 注册接口
    ACCOUNT_SIGN: `${PREFIX}${ACCOUNT}/sign`,

    // 2.3 忘记密码接口
    ACCOUNT_FIND_PASSWORD: `${PREFIX}${ACCOUNT}/find-password`,

    // 2.4 修改密码接口
    ACCOUNT_UPDATE_PASSWORD: `${PREFIX}${ACCOUNT}/update-password`,

    // 4.1 推荐页数据
    RECOMMEND_DATA: `${PREFIX}${RECOMMEND}/data`,

    // 4.2 上传二维码
    RECOMMEND_UPLOAD: `${PREFIX}${RECOMMEND}/upload`,

    // 5.1.1 修改昵称/微信号
    USER_UPDATE_INFO: `${PREFIX}${USER}/update-info`,

    // 5.1.2 修改手机号(废弃)
    // USER_UPDATE_PHONE: `${PREFIX}${USER}/update-phone`,

    // 5.2.1 提现
    WITHDRAWALS_MONEY: `${PREFIX}${WITHDRAWALS}/money`,

    // 5.2.2 提现列表
    WITHDRAWALS_LIST: `${PREFIX}${WITHDRAWALS}/list`,

    // 5.3.1 删除/修改默认银行卡
    CARD_HANDLE: `${PREFIX}${CARD}/handle`,

    // 5.3.2 添加银行卡
    CARD_ADD: `${PREFIX}${CARD}/add`,

    // 5.4.1 消费列表
    RECHARGE_LIST: `${PREFIX}${RECHARGE}/list`,

    // 5.4.3 支付
    RECHARGE_BUY: `${PREFIX}${RECHARGE}/pay`,

    // 5.4.2 消费详情
    RECHARGE_DETAIL: `${PREFIX}${RECHARGE}/detail`,

    // 5.5.1 我的收益列表
    PROFIT_LIST: `${PREFIX}${PROFIT}/list`,

    // 5.5.2 近七天收益数据
    PROFIT_LINE: `${PREFIX}${PROFIT}/line`,

    // 5.6.1 我的团队列表
    TEAM_LIST: `${PREFIX}${TEAM}/list`,

    // 5.6.2 banner图
    PROFIT_BANNER: `${PREFIX}${TEAM}/banner`,
}
