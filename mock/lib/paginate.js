import Mock from 'mockjs'

/**
 * 生成分页测试数据
 *
 * @param {object} mock 基本数据
 * @param {object} requestParams 返回参数
 * @param {number} requestParams.page 请求页数
 * @param {number} requestParams.pageSize 请求页数
 * @param {object} userOptions 配置
 * @param {number} userOptions.totalPage 生成数据页数
 * @param {string} userOptions.dataName 生成的数组名称
 * @param {string} userOptions.paginate 分页字段名称
 * @return {object} 生成的数据
 */
export function generatePaginateData(mock, requestParams, userOptions) {
    const DEFAULT_OPTIONS = {
        totalPage: 5,
        dataName: 'list',
        paginateName: 'paginate',
    }

    const DEFAULT_PARAM = {
        page: 1,
        pageSize: 15,
    }

    const options = Object.assign({}, DEFAULT_OPTIONS, userOptions)
    const params = Object.assign({}, DEFAULT_PARAM, requestParams)

    const responseData = {}
    responseData[options.dataName] = []

    if (params.page <= options.totalPage) {
        for (let i = 1; i <= 15; i += 1) {
            responseData[options.dataName].push({
                ...Mock.mock(mock),
                _sequence: ((params.page - 1) * params.pageSize) + i,
            })
        }
    }

    responseData[options.paginateName] = {
        page: params.page,
        pageSize: params.pageSize,
        total: params.pageSize * options.totalPage,
    }

    return responseData
}
