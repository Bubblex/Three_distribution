import React from 'react'
import { connect } from 'dva'
import Clipboard from 'clipboard'
import classNames from 'classnames'
import { browserHistory } from 'dva/router'
import {
    Flex,
    Toast,
    Button,
    ListView,
    Carousel,
} from 'antd-mobile'
import ROUTES from '../config/routes'
import None from '../components/none'
import styles from './team/team.less'
import ListItem from './team/list-item'
import publicStyles from './public/public.less'
import { LOWER_LEVEL } from '../config/data-item'

const FlexItem = Flex.Item
let index = 0

class Team extends React.Component {
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
        const buttonIdSelector = '#button'

        this.clipboard = new Clipboard(
            buttonIdSelector, {
                target: () => document.getElementById('input'),
            },
        )
    }

    componentWillReceiveProps(nextProps) {
        const teamList = nextProps.team.teamList
        const teamPaginate = nextProps.team.teamPaginate

        if (teamList.length > 0 && teamPaginate.page !== this.props.team.teamPaginate.page) {
            this.rData = this.rData.concat(teamList)
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            })
        }
        else if (teamList.length === 0 && this.rData.length === 0) {
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
            team: {
                teamPaginate,
                teamPaginate: {
                    page,
                },
            },
        } = this.props

        if (this.state.isLoading && !this.state.hasMore) {
            return
        }

        if (!teamPaginate || !page) {
            return
        }

        this.setState({ isLoading: true })

        const query = this.props.location.query

        dispatch({
            type: 'team/fetchTeamList',
            payload: {
                page: page + 1,
                ...query,
            },
        })
    }

    removeData = () => {
        this.props.dispatch({
            type: 'team/removeTeamList',
        })

        this.rData = []
    }

    render() {
        const {
            team: {
                teamBanner,
                teamList,
                teamAccount: {
                    type,
                },
            },
            common: {
                commonUser: {
                    id,
                    code,
                    info: {
                        two_nums: twoNums,
                        three_nums: threeNums,
                        four_nums: fournums,
                    },
                },
            },
        } = this.props

        const separator = (sectionID, rowID) => (
            <div key={`${sectionID}-${rowID}`} />
        )

        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = teamList.length - 1
            }

            return (
                <ListItem key={rowID} rowData={rowData} type={type} />
            )
        }

        return (
            <div className={styles.container}>
                <div>
                    <div className={styles.banner}>
                        <Carousel
                            autoplay
                            speed={500}
                            dots={false}
                            autoplayInterval={2500}
                        >
                            {
                                teamBanner.map(({ image }, indexs) => (
                                    <div key={indexs} className={styles.carousel}>
                                        <img src={image} alt='' />
                                    </div>
                                ))
                            }
                        </Carousel>
                        <Button
                            onClick={() => { browserHistory.push(`${ROUTES.RECOMMEND}?id=${id}`) }}
                            className={classNames(publicStyles.bigButton, styles.recommendBtn)} type='primary'
                        >我要推荐</Button>
                    </div>
                    <p className={styles.recommendCode}>推荐码：{code}
                        <span id='button' onClick={() => { Toast.success('复制成功', 1) }}>复制</span>
                        <input id='input' value={code} />
                    </p>
                    <Flex className={publicStyles.lowerLevel}>
                        <FlexItem>
                            一级好友<p>{twoNums}人</p>
                        </FlexItem>
                        <FlexItem>
                            二级好友<p>{threeNums}人</p>
                        </FlexItem>
                        <FlexItem>
                            三级好友<p>{fournums}人</p>
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
})(Team)
