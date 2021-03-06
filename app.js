const express = require('express')
const chalk = require('chalk')
const debug = require('debug')('app')
const morgan = require('morgan')
const path = require('path')
const sessions = require('./src/data/sessions.json')

const PORT = process.env.PORT || 3000;
const app = express()
const sessionsRouter = express.Router()

app.use(morgan('tiny'))
app.use(express.static(path.join(__dirname, '/public/')))

app.set('views', './src/views')
app.set('view engine', 'ejs')

sessionsRouter.route('/')
    .get((req, res) => {
        res.render('sessions', {
            sessions,
    })
})

sessionsRouter.route('/:id')
    .get((req, res)=>{
        const id = req.params.id
        res.render('session', {
            session: sessions[id],
        })
    })

app.use('/sessions', sessionsRouter)

app.get('/',(req, res) => {
    res.render('index', {title: 'globomantics',  data: ['a', 'b', 'c'] })
})

app.listen(PORT, ()=> {
    debug(`listening to port ${chalk.green('PORT')} `)
})