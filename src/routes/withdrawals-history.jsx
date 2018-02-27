import React from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import {
    Tabs,
    ListView,
} from 'antd-mobile'
import ROUTES from '../config/routes'
import None from '../components/none'
import ListItem from './withdrawals/list-item'
import publicStyles from './public/public.less'
import styles from './withdrawals/withfrawals.less'

const TabPane = Tabs.TabPane
let index = 0

class WithdrawalsHistory extends React.Component {
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
            withdrawals: {
                withdrawalsListType,
            },
        } = this.props

        dispatch({
            type: 'withdrawals/getWithdrawalsList',
            payload: {
                page: 1,
                type: withdrawalsListType,
            },
        })
    }

    componentWillReceiveProps(nextProps) {
        const withdrawalsList = nextProps.withdrawals.withdrawalsList
        const withdrawalsPaginate = nextProps.withdrawals.withdrawalsPaginate

        if (withdrawalsList.length > 0 && withdrawalsPaginate.page !== this.props.withdrawals.withdrawalsPaginate.page) {
            this.rData = this.rData.concat(withdrawalsList)
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            })
        }
        else if (withdrawalsList.length === 0 && this.rData.length === 0) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                hasMore: false,
            })
        }
    }

    componentWillUnmount() {
        const {
            dispatch,
        } = this.props

        this.rData = []

        dispatch({
            type: 'withdrawals/removeWithdrawalsList',
        })

        dispatch({
            type: 'withdrawals/changeWithdrawalsListType',
            withdrawalsListType: 1,
        })
    }

    onEndReached = () => {
        const {
            dispatch,
            withdrawals: {
                withdrawalsListType,
                withdrawalsPaginate,
                withdrawalsPaginate: {
                    page,
                },
            },
        } = this.props

        if (this.state.isLoading && !this.state.hasMore) {
            return
        }

        if (!withdrawalsPaginate || !page) {
            return
        }

        this.setState({ isLoading: true })

        dispatch({
            type: 'withdrawals/getWithdrawalsList',
            payload: {
                page: page + 1,
                type: withdrawalsListType,
            },
        })
    }

    onTabClick = (key) => {
        const {
            dispatch,
        } = this.props

        this.rData = []

        dispatch({
            type: 'withdrawals/removeWithdrawalsList',
        })

        dispatch({
            type: 'withdrawals/changeWithdrawalsListType',
            withdrawalsListType: parseInt(key, 10),
        })

        dispatch({
            type: 'withdrawals/getWithdrawalsList',
            payload: {
                page: 1,
                type: parseInt(key, 10),
            },
        })
    }

    render() {
        const {
            common: {
                commonUser: {
                    info: {
                        withdrawals,
                    },
                },
            },
            withdrawals: {
                withdrawalsList,
            },
        } = this.props

        const separator = (sectionID, rowID) => (
            <div key={`${sectionID}-${rowID}`} />
        )

        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = withdrawalsList.length - 1
            }

            return (
                <ListItem
                    key={rowID}
                    rowData={rowData}
                />
            )
        }

        const ListViewPlan = (
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
        )

        const tabPaneContent = (
            <div>
                { this.rData.length === 0 && <None text='暂无提现记录' />}
                { this.rData.length !== 0 && ListViewPlan }
            </div>
        )

        return (
            <div>
                <div className={publicStyles.headerMoney}>
                    <Link to={ROUTES.CARD} className={styles.card}>银行卡管理</Link>
                    <p className={publicStyles.title}>提现总计（元）</p>
                    <p className={publicStyles.money}>{withdrawals && withdrawals.toFixed(2)}</p>
                </div>
                <div className={styles.tabs}>
                    <Tabs onTabClick={(key) => { this.onTabClick(key) }}>
                        <TabPane tab='提现中' key='1'>
                            {tabPaneContent}
                        </TabPane>
                        <TabPane tab='提现成功' key='2'>
                            {tabPaneContent}
                        </TabPane>
                        <TabPane tab='提现失败' key='3'>
                            {tabPaneContent}
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(WithdrawalsHistory)
