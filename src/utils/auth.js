import Cookies from 'js-cookie'

export default {
    /**
     * 获取 token 值
     * @return {string} token值
     */
    getToken() {
        return Cookies.get('token')
    },
    /**
     * 写入 token 值
     * @param {string} token token 值
     */
    setToken(token) {
        Cookies.set('token', token, { expires: 7 })
    },
    /**
     * 删除 token 值
     * @param {string} token token 值
     */
    delToken() {
        Cookies.remove('token')
    },
}
