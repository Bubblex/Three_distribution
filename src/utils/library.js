import { Toast } from 'antd-mobile'

/**
 * 获取 InputItem 组件的错误验证相关参数
 *
 * @param {Object} errors getFieldError 的返回值
 * @return {Object} 参数
 */
export function getInputItemError(errors) {
    return {
        error: errors,
        onErrorClick: () => {
            if (errors) {
                Toast.fail(errors.join(','), 1)
            }
        },
    }
}

/**
 * 获取 Radio 组件在 rc-form 中的参数
 *
 * @param {(String|Number)} value 单选框的值
 * @param {(String|Number)} initialValue 默认值
 * @return {Object} rc-form 的参数
 */
export function getRadioProps(value, initialValue) {
    return {
        exclusive: true,
        getValueFromEvent(e) {
            return e.target.checked ? value : undefined
        },
        getValueProps(valueProps) {
            return {
                checked: valueProps !== undefined ? valueProps === value : initialValue === value,
            }
        },
    }
}

/**
 * 获取 Checkbox 组件在 rc-form 中的参数
 *
 * @param {(String|Number)} value 值
 * @param {Array} initialValue 默认值
 * @return {Object} rc-form 的参数
 */
export function getCheckboxProps(value, initialValue = []) {
    return {
        getValueFromEvent(e) {
            return e.target.checked ? value : undefined
        },
        getValueProps(valueProps) {
            let checked = false

            for (const item of initialValue) {
                if (item === value) {
                    checked = true
                    break
                }
            }

            return {
                checked: valueProps !== undefined ? valueProps === value : checked,
            }
        },
    }
}

/**
 * 过滤数组中的 undefined 值
 *
 * @param {Array} list 要过滤的数组
 * @return {Array} 过滤后的数组
 */
export function filterUndefinedForArray(list = []) {
    const result = []

    for (const item of list) {
        if (item !== undefined) {
            result.push(item)
        }
    }

    return result
}

/**
 * 处理请求参数
 *
 * @param {object} params 请求参数
 * @return {string} JSON 字符串
 */
export function query(params) {
    return JSON.stringify(params)
}
