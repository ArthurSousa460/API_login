const express = require('express')
const routes = require('./routes')
const session = require('express-session')
const passport = require('passport')
const BodyParse =require('body-parser')
const bodyParser = require('body-parser')


const app = express()
const port = 3333


app.set('view engine', 'ejs')
app.set('views', __dirname +  '/views')
app.use(BodyParse.urlencoded({extended : false}))
app.use(bodyParser.json())
app.use(express.json())

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 2 * 60 * 1000}
}))
app.use(passport.initialize())
app.use(passport.session())
app.use('/', routes)


app.listen(port, () =>{
    console.log("Running on http://127.0.0.1:3333")
})

