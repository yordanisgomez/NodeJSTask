const config = require('../../lib/common/config')
const express = require('express')
const cors = require('cors')

/*
* Setup the express application
* */
const init = (passport) => {
    const app = express()
    app.use(cors())
    app.use(passport.initialize())
    app.use('/api', require('../api/routes'))
    app.listen(config.port)
    return app
}

module.exports = {init}
