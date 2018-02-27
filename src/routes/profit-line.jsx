import React from 'react'
import { connect } from 'dva'
import { Flex } from 'antd-mobile'
import styles from './profit/profit.less'

const FlexItem = Flex.Item

class ProfitLine extends React.Component {
    componentWillUnmount() {
        this.chart.destroy()
        this.props.dispatch({
            type: 'profit/saveProfitLine',
            profitLine: [],
        })
    }

    renderLine = (profitLine) => {
        this.chart = new GM.Chart({
            id: 'c1',
        })

        const gmchartdata = profitLine

        const defs = {
            created_at: {
                type: 'timeCat',
                mask: 'mm/dd',
                tickCount: 7,
                range: [0, 1],
            },
            num: {
                min: 0,
            },
        }

        this.chart.axis('num', false)

        this.chart.axis('created_at', {
            label: {
                fontSize: 28,
            },
        })

        this.chart.source(gmchartdata, defs)

        // 生成渐变色
        const canvas = document.getElementById('c1')
        const linearGradient = canvas.getContext('2d').createLinearGradient(0, 0, 0, 600)
        linearGradient.addColorStop(0.6, '#f0f0f0')
        linearGradient.addColorStop(0, '#13c287')

        // 填充渐变色
        this.chart.area().position('created_at*num').color('city', () => {
            return linearGradient
        }).style({ opacity: 0.6 })

        // 绘制线图
        this.chart.line().position('created_at*num').color('#13c287').size('4')
        this.chart.point().position('created_at*num').color('#13c287')

        gmchartdata.forEach((obj) => {
            this.chart.guide().html([obj.created_at, obj.num],
                `<div style='color: #999; font-size: 28px;'><span>${obj.num}</span></div>`,
                { align: 'tc', offset: [0, -16] })
        })

        this.chart.render()
    }

    render() {
        const {
            common: {
                commonUser: {
                    info: {
                        all_profit: allProfit,
                        yesterday_profit: yesterdayProfit,
                        today_profit: todayProfit,
                    },
                },
            },
            profit: {
                profitLine,
            },
        } = this.props

        if (profitLine.length !== 0) {
            this.renderLine(profitLine)
        }

        return (
            <div className={styles.container}>
                <div className={styles.banner}>
                    <div className={styles.allProfit}>
                        <p>{allProfit && allProfit.toFixed(2)}</p>
                        <p>当前累计收益总额（元）</p>
                    </div>
                    <Flex>
                        <FlexItem className={styles.dayProfit}>
                            <p>{yesterdayProfit && yesterdayProfit.toFixed(2)}</p>
                            <p>昨日收益（元）</p>
                        </FlexItem>
                        <FlexItem className={styles.dayProfit}>
                            <p>{todayProfit && todayProfit.toFixed(2)}</p>
                            <p>今日收益（元）</p>
                        </FlexItem>
                    </Flex>
                </div>
                <p className={styles.title}>近七天收益</p>
                <div style={{ width: '100%', height: '300px' }}>
                    <canvas id='c1' style={{ width: '100%', height: '100%' }} />
                </div>
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(ProfitLine)
