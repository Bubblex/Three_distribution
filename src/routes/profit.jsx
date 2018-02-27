import React from 'react'
import { connect } from 'dva'
import {
    Flex,
    ListView,
} from 'antd-mobile'
import None from '../components/none'
import ListItem from './profit/list-item'
import publicStyles from './public/public.less'
import { LOWER_LEVEL } from '../config/data-item'

const FlexItem = Flex.Item
let index = 0

class Profit extends React.Component {
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

    componentWillReceiveProps(nextProps) {
        const profitList = nextProps.profit.profitList
        const profitPaginate = nextProps.profit.profitPaginate

        if (profitList.length > 0 && profitPaginate.page !== this.props.profit.profitPaginate.page) {
            this.rData = this.rData.concat(profitList)
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            })
        }
        else if (profitList.length === 0 && this.rData.length === 0) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                hasMore: false,
            })
        }

        else if (this.props.location.search !== nextProps.location.search) {
            this.removeData()
        }
    }

    componentWillUnmount() {
        this.removeData()
    }

    onEndReached = () => {
        const {
            dispatch,
            profit: {
                profitPaginate,
                profitPaginate: {
                    page,
                },
            },
        } = this.props

        if (this.state.isLoading && !this.state.hasMore) {
            return
        }

        if (!profitPaginate || !page) {
            return
        }

        this.setState({ isLoading: true })

        const query = this.props.location.query

        dispatch({
            type: 'profit/getProfitList',
            payload: {
                page: page + 1,
                ...query,
            },
        })
    }

    removeData = () => {
        this.props.dispatch({
            type: 'profit/removeProfitList',
        })

        this.rData = []
    }

    render() {
        const {
            profit: {
                profitAccount: {
                    type,
                },
                profitList,
            },
            common: {
                commonUser: {
                    info: {
                        all_profit: allProfit,
                        two_profit: twoProfit,
                        three_profit: threeProfit,
                        four_profit: fourProfit,
                    },
                },
            },
        } = this.props

        const separator = (sectionID, rowID) => (
            <div key={`${sectionID}-${rowID}`} />
        )

        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = profitList.length - 1
            }

            return (
                <ListItem key={rowID} rowData={rowData} type={type} />
            )
        }

        return (
            <div>
                <div>
                    <div className={publicStyles.headerMoney}>
                        <p className={publicStyles.title}>我的收益总额</p>
                        <p className={publicStyles.money}>{allProfit && allProfit.toFixed(2)}</p>
                    </div>
                    <Flex className={publicStyles.lowerLevel}>
                        <FlexItem>
                            一级好友<p>￥{twoProfit && twoProfit.toFixed(2)}</p>
                        </FlexItem>
                        <FlexItem>
                            二级好友<p>￥{threeProfit && threeProfit.toFixed(2)}</p>
                        </FlexItem>
                        <FlexItem>
                            三级好友<p>￥{fourProfit && fourProfit.toFixed(2)}</p>
                        </FlexItem>
                    </Flex>
                </div>
                <p className={publicStyles.lowerLevelTitle}>
                    {
                        type === LOWER_LEVEL.TWO_NEXT ? '二级好友' :
                        type === LOWER_LEVEL.THREE_NEXT ? '三级好友' : '一级好友'
                    }
                </p>
                {this.rData.length === 0 && <None text='暂无好友' />}
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
})(Profit)
