import React from 'react'
import { connect } from 'dva'
import classNames from 'classnames'
import {
    Toast,
} from 'antd-mobile'
import ROUTES from '../config/routes'
import styles from './recommend/recommend.less'
import { showMenuItems, setConfig } from '../utils/wechat'

class Recommend extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            imagePreviewUrl: '',
            isPewview: false,
        }
    }

    // componentDidUpdate() {
    //     const {
    //         search,
    //         origin,
    //     } = window.location

    //     const data = {
    //         title: '加入阿狸扫呗，人脉就是钱脉。',
    //         desc: '阿狸扫呗－专业移动收款工具，手机变身POS机，安全／快捷／费率低，分享还能赚钱！',
    //         link: origin + ROUTES.RECOMMEND_SHARE + search,
    //         imgUrl: origin + require('../routes/public/share.png'),
    //     }

    //     showMenuItems(data)
    // }

    uploadQrcode = (e) => {
        e.preventDefault()

        const reader = new FileReader()
        const file = e.target.files[0]
        reader.onloadend = () => {
            this.setState({
                imagePreviewUrl: reader.result,
            })

            this.props.dispatch({
                type: 'recommend/fetchRecommendUpload',
                payload: {
                    image: reader.result,
                },
            })

            this.props.dispatch({
                type: 'recommend/changeRecommendData',
                isShowUpload: false,
            })

            this.setState({
                isPewview: false,
            })
        }
        reader.readAsDataURL(file)
    }

    closeImage = () => {
        this.props.dispatch({
            type: 'recommend/changeRecommendData',
            isShowUpload: true,
        })
    }

    handlePewview = () => {
        const {
            recommend: {
                isShowUpload,
            },
        } = this.props
        if (isShowUpload) {
            Toast.fail('请先上传二维码', 1)
            return
        }

        this.setState({
            isPewview: true,
        })
    }

    render() {
        const {
            recommend: {
                recommendData: {
                    image,
                },
                isShowUpload,
            },
        } = this.props

        const isPewview = this.state.isPewview

        return (
            <div className={styles.container}>
                {!isPewview && <div onClick={this.handlePewview} className={styles.pewview} />}
                <div className={styles.publicity}>
                    {!isPewview && <div className={styles.step} />}
                </div>
                {
                    isShowUpload
                    &&
                    <div className={styles.upload} >
                        <input
                            type='file'
                            onChange={(e) => { this.uploadQrcode(e) }}
                            accept='image/jpg,image/jpeg,image/png,image/gif'
                        />
                    </div>
                }
                {
                    !isShowUpload
                    &&
                    <div className={classNames(styles.qrcode, isPewview && styles.preview)}>
                        {!isPewview && <div className={styles.close} onClick={this.closeImage} />}
                        <img alt='' src={this.state.imagePreviewUrl || image} />
                        {
                            isPewview
                            &&
                            <input
                                type='file'
                                onChange={(e) => { this.uploadQrcode(e) }}
                                accept='image/jpg,image/jpeg,image/png,image/gif'
                            />
                        }
                    </div>
                }
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(Recommend)
