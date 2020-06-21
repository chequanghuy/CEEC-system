const router = require('express').Router();
const db = require('../database/database');
var aesjs = require('aes-js');
const userService = require('./user.service');
const { use } = require('passport');
var key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
// The initialization vector (must be 16 bytes)
var iv = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];


router.get('/', function (req, res) {
    res.clearCookie("access-token");
    res.clearCookie("user-data");
    res.render('login');
})
router.get('/mainpage', function (req, res) {
    console.log(req.cookies);
    res.render('mainpage');
})
router.post('/addmember', register)
router.post('/getdatamember', getdatamember)
router.post('/authenticate', authenticate)
module.exports = router;
function authenticate(req, res, next) {
    console.log(req.body)
    userService.authenticate(req.body)
        .then(user => {
            if (user) {
                res.cookie("access-token", user.token, { maxAge: 86400000 });
                var { token, ...datawithouttoken } = user;
                res.cookie("user-data", JSON.stringify(datawithouttoken), { maxAge: 86400000 });
                res.redirect('/mainpage');
            }
            else {
                res.status(400).json({ message: 'UserID or password is incorrect' })
            }
        })
        .catch(err => next(err));
}

async function register(req, res, next) {
    console.log(req.cookies)
    if (await userService.checkAdmin(JSON.parse(req.cookies["user-data"])) == 0) {
        res.send("ga");
    } else {
        userService.addmember(req.body)
            .then((status) => {
                if (status)
                    res.send("Ok");
                else
                    res.send("Fail");
            })
            .catch(err => next(err));
    }
}

function getdatamember(req, res, next) {
    userService.getdatamember()
        .then(users => res.send(users))
        .catch(err => next(err));
}