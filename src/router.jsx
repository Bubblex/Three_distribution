import React from 'react'
import { Router, Route } from 'dva/router'
import ROUTES from './config/routes'

function RouterConfig({ history }) {
    return (
        <Router history={history}>
            <Route path={ROUTES.RECOMMEND} component={require('../src/routes/recommend')} />
            <Route component={require('./routes/basic-layout')}>
                <Route showLinkHot path={ROUTES.INDEX} component={require('../src/routes/index')} />
                <Route showUser path={ROUTES.BUY} component={require('../src/routes/buy')} />
                <Route path={ROUTES.BUY_SUCCESS} component={require('../src/routes/buy-success')} />
                <Route path={ROUTES.BUY_FAIL} component={require('../src/routes/buy_fail')} />

                <Route path={ROUTES.RECOMMEND_SHARE} component={require('../src/routes/recommend-share')} />
                <Route path={ROUTES.LOGIN} component={require('../src/routes/account-login')} />
                <Route path={ROUTES.SIGN} component={require('../src/routes/account-sign')} />
                <Route path={ROUTES.FIND_PASSWORD} component={require('../src/routes/account-find-password')} />
                <Route path={ROUTES.FORBIDDEN} component={require('../src/routes/forbidden')} />

                <Route path={ROUTES.USER} component={require('../src/routes/user')} />
                <Route path={ROUTES.USER_DATA} component={require('../src/routes/user-data')} />
                <Route path={ROUTES.USER_NICKNAME} component={require('../src/routes/user-nickname')} />
                <Route path={ROUTES.USER_PASSWORD} component={require('../src/routes/user-password')} />
                <Route path={ROUTES.WITHDRAWALS} component={require('../src/routes/withdrawals')} />
                <Route showUser path={ROUTES.WITHDRAWALS_HISTORY} component={require('../src/routes/withdrawals-history')} />
                <Route path={ROUTES.CARD} component={require('../src/routes/card')} />
                <Route path={ROUTES.CARD_ADD} component={require('../src/routes/card-add')} />
                <Route showUser path={ROUTES.RECHARGE} component={require('../src/routes/recharge')} />
                <Route path={ROUTES.RECHARGE_DETAIL} component={require('../src/routes/recharge-detail')} />
                <Route showUser path={ROUTES.PROFIT} component={require('../src/routes/profit')} />
                <Route showUser path={ROUTES.PROFIT_NEXT} component={require('../src/routes/profit-next')} />
                <Route showUser path={ROUTES.PROFIT_LINE} component={require('../src/routes/profit-line')} />
                <Route showUser path={ROUTES.TEAM} component={require('../src/routes/team')} />
                <Route showUser path={ROUTES.TEAM_NEXT} component={require('../src/routes/team-next')} />
                <Route path='*' component={require('./routes/error')} />
            </Route>
        </Router>
    )
}

export default RouterConfig
