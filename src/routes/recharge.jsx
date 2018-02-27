import React from 'react'
import moment from 'moment'
import { connect } from 'dva'
import { browserHistory } from 'dva/router'
import {
    List,
    ListView,
} from 'antd-mobile'
import None from '../components/none'
import ROUTES from '../config/routes'
import styles from './recharge/recharge.less'
import publicStyles from './public/public.less'

let index = 0
const ListItem = List.Item

class Recharge extends React.Component {
    constructor(props) {
        super(props)
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        })

        // 当前所有元素的列表
        this.rData = []
        this.state = {
            dataSource: dataSource.cloneWithRows(this.rData),
            isLoading: true,
        }
    }

    componentDidMount() {
        // render 完成后，第一次请求获取数据
        const {
            dispatch,
        } = this.props

        dispatch({
            type: 'recharge/getRechargeList',
            payload: {
                page: 1,
            },
        })
    }

    componentWillReceiveProps(nextProps) {
        const rechargeList = nextProps.recharge.rechargeList
        const rechargePaginate = nextProps.recharge.rechargePaginate

        if (rechargeList.length > 0 && rechargePaginate.page !== this.props.recharge.rechargePaginate.page) {
            this.rData = this.rData.concat(rechargeList)
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            })
        }
        else if (rechargeList.length === 0 && this.rData.length === 0) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                hasMore: false,
            })
        }
    }

    componentWillUnmount() {
        this.props.dispatch({
            type: 'recharge/removeRechargeList',
        })
    }

    onEndReached = () => {
        const {
            dispatch,
            recharge: {
                rechargePaginate,
                rechargePaginate: {
                    page,
                },
            },
        } = this.props

        if (this.state.isLoading && !this.state.hasMore) {
            return
        }

        if (!rechargePaginate || !page) {
            return
        }

        this.setState({ isLoading: true })

        dispatch({
            type: 'recharge/getRechargeList',
            payload: {
                page: page + 1,
            },
        })
    }

    render() {
        const {
            recharge: {
                rechargeList,
            },
            common: {
                commonUser: {
                    info: {
                        recharge,
                    },
                },
            },
        } = this.props

        const separator = (sectionID, rowID) => (
            <div key={`${sectionID}-${rowID}`} />
        )

        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = rechargeList.length - 1
            }

            const {
                code,
                p_price: pPrice,
                created_at: createdAt,
            } = rowData

            return (
                <List key={rowID}>
                    <ListItem
                        arrow='horizontal'
                        onClick={() => { browserHistory.push(`${ROUTES.RECHARGE_DETAIL}?code=${code}`) }}
                        extra={<div className={styles.creatTime}>{moment(createdAt).format('MM/DD')}<p>{moment(createdAt).format('YYYY')}</p></div>}
                    ><p className={styles.price}>-￥<span>{pPrice.toFixed(2)}</span></p></ListItem>
                </List>
            )
        }

        return (
            <div>
                <div className={publicStyles.headerMoney}>
                    <p className={publicStyles.title}>消费总计（元）</p>
                    <p className={publicStyles.money}>{recharge && recharge.toFixed(2)}</p>
                </div>
                {this.rData.length === 0 && <None text='暂无消费记录' />}
                {
                    this.rData.length !== 0
                    &&
                    <ListView
                        useBodyScroll
                        renderRow={row}
                        className='am-list'
                        scrollEventThrottle={15}
                        onEndReachedThreshold={100}
                        renderSeparator={separator}
                        scrollRenderAheadDistance={500}
                        onEndReached={this.onEndReached}
                        dataSource={this.state.dataSource}
                        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                            {!this.state.hasMore ? '没有更多了' : this.state.isLoading ? '加载中...' : '' }
                        </div>)}
                    />
                }
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(Recharge)
