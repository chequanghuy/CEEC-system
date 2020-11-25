const router = require('express').Router();
// const db = require('../database/database');
var aesjs = require('aes-js');
const userService = require('./user.service');
// const db = require('./data.service');
const db = require('../database/database');
const { use } = require('passport');
var key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
// The initialization vector (must be 16 bytes)
var iv = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];

router.get('/test', function (req, res) {
    console.log('ok r');
})
router.get('/', function (req, res) {
    res.clearCookie("access-token");
    res.clearCookie("user-data");
    res.render('login');
})
router.get('/mainpage', function (req, res) {
    console.log(req.cookies);
    res.render('mainpage');
})
// router.post('/addmember', register)
// router.post('/getdatamember', getdatamember)
// router.post('/authenticate', authenticate)
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
    // console.log(req.cookies)
    // if (await userService.checkAdmin(JSON.parse(req.cookies["user-data"])) == 0) {
    //     res.send("ga");
    // } else {
        userService.addmember(req.body)
            .then((status) => {
                if (status)
                    res.send("Ok");
                else
                    res.send("Fail");
            })
            .catch(err => next(err));
    // }
}

function getdatamember(req, res, next) {
    userService.getdatamember()
        .then(users => res.send(users))
        .catch(err => next(err));
}

// 
router.post('/addDevice', async (req, res)=>{
    res.send({status: await db.addDevice(req.body)})
})
router.post('/getListDevices',async (req, res)=>{
    console.log(req.body);
    res.send(JSON.stringify(await db.getListDevices(req.body.begin, req.body.end)));
})
router.post('/getSingleDevice',async (req, res)=>{
    console.log(req.body);
    res.send(JSON.stringify(await db.getSingleDevice(req.body)));
})
router.post('/getCountDevices', async (req, res) =>{
    console.log(await db.countDevices());
    res.send(JSON.stringify({count : await db.countDevices()}));
})
router.post('/updateDevice',async (req, res)=>{
    console.log(req.body);
    res.send({status:await db.updateDevice(req.body)});
})
router.post('/deleteDevice',async (req, res)=>{
    console.log(req.body);
    res.send({status:await db.deleteDevice(req.body)});
})
///
router.post('/getListMembers',async (req, res)=>{
    res.send(JSON.stringify(await db.getListMembers()));
})
router.post('/getSingleMember',async (req, res)=>{
    console.log(req.body);
    res.send(JSON.stringify(await db.getSingleMember(req.body)));
})
router.post('/addMember', async (req, res)=>{
    res.send({status: await db.addMember(req.body)})
})
router.post('/updateMember',async (req, res)=>{
    console.log(req.body);
    res.send({status: await db.updateMember(req.body)});
})
router.post('/deleteMember',async (req, res)=>{
    console.log(req.body);
    res.send({status:await db.deleteMember(req.body)});
})
// 
router.post('/addLoan', async (req, res)=>{
    res.send({status: await db.addLoan(req.body)})
})
router.post('/getListLoans',async (req, res)=>{
    console.log(req.body);
    res.send(JSON.stringify(await db.getListLoans(req.body.begin, req.body.end)));
})
// router.post('/getSingleLoan',async (req, res)=>{
//     console.log(req.body);
//     res.send(JSON.stringify(await db.getSingleLoan(req.body)));
// })
router.post('/getCountLoans', async (req, res) =>{
    // console.log(await db.countDevices());
    res.send(JSON.stringify({count : await db.countLoans()}));
})
// router.post('/updateLoan',async (req, res)=>{
//     // console.log(req.body);
//     await db.updateDevice(req.body);
// })
// router.post('/deleteLoan',async (req, res)=>{
//     // console.log(req.body);
//     await db.deleteLoan(req.body);
// })