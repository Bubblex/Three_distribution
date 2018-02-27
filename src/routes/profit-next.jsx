import React from 'react'
import { connect } from 'dva'
import {
    ListView,
} from 'antd-mobile'
import None from '../components/none'
import ListItem from './profit/list-item'
import publicStyles from './public/public.less'
import { LEVEL_ID, LOWER_LEVEL } from '../config/data-item'

let index = 0

class ProfitNext extends React.Component {
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
                    level_id: accountLevelId,
                    title: accountTitle,
                },
                profitList,
            },
            common: {
                commonLevel,
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

        const hasLevel = commonLevel.length !== 0

        return (
            <div>
                <div className={publicStyles.avatarTop}>
                    <div className={publicStyles.avatarContainer}>
                        <img
                            src={
                                accountLevelId === LEVEL_ID.KING ? require('./public/king.png') :
                                accountLevelId === LEVEL_ID.PRINCE ? require('./public/prince.png') :
                                accountLevelId === LEVEL_ID.KING ? require('./public/king.png') :
                                require('./public/avatar.png')
                            }
                            alt=''
                        />
                        <span>{hasLevel && accountLevelId && commonLevel[accountLevelId - 1].title}</span>
                    </div>
                    <p>{accountTitle}</p>
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
})(ProfitNext)
