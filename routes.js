const express = require('express')
const router = express.Router()
const users = require('./users')
const passport = require('./auth')


router.get("/",  (req, res) => {
    if(req.isAuthenticated()){
        res.send('área protegida').status(200)
    }else{
        res.redirect('/login')
    }
    
})

router.get('/register', (req, res) =>{
    res.render('cadastro.ejs')
})

router.post('/register', (req, res) =>{
    let id = 1
    let name = req.body.name
    let pass =req.body.password
    users.push({id: id, name: name, password: pass})
    res.status(201).render('cadastrado.ejs')
})

router.get('/login', (req, res) =>{
    res.render('index.ejs')
})

router.post('/login',  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}))


module.exports = router