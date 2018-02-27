import dva from 'dva'
import { browserHistory } from 'dva/router'

import './app.less'

const app = dva({
    history: browserHistory,
})

app.use({})

app.model(require('./models/buy'))
app.model(require('./models/team'))
app.model(require('./models/user'))
app.model(require('./models/card'))
app.model(require('./models/common'))
app.model(require('./models/profit'))
app.model(require('./models/account'))
app.model(require('./models/recharge'))
app.model(require('./models/recommend'))
app.model(require('./models/withdrawals'))

app.router(require('./router'))

app.start('#root')
