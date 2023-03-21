var express = require('express');
let users = require('../inc/users')
var router = express.Router();
var conn = require('../inc/db');

router.get('/', function (req, res, next) {
    res.render("admin/index")
})

router.post('/login', function (req, res, next) {
    if (!req.body.email) {
        users.render(req, res, "Preencha o campo email!")
    } else if (!req.body.password) {
        users.render(req, res, "Preencha o campo senha!")
    } else {
        users.login(req.body.email, req.body.password).then((user) => {
            req.session.user = "Usuario ou senha incorretos";
            res.redirect('/admin')
        }).catch((err) => {
            users.render(req, res, err.message || err)
        })
    }
})

router.get('/login', function (req, res, next) {
    users.render(req, res)
})

router.get('/contacts', function (req, res, next) {
    res.render("admin/contacts")
})

router.get('/emails', function (req, res, next) {
    res.render("admin/emails")
})

router.get('/menus', function (req, res, next) {
    res.render("admin/menus")
})

router.get('/reservations', function (req, res, next) {
    res.render("admin/reservations", {
        date: {}
    })
})

router.get('/users', function (req, res, next) {
    res.render("admin/users")
})

module.exports = router;