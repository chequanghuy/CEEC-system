const config = require('../config.json');
const jwt = require('jsonwebtoken');
const db = require('../database/database');
var aesjs = require('aes-js');

var key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
// The initialization vector (must be 16 bytes)
var iv = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];

module.exports = {
    authenticate,
    getdatamember,
    addmember, checkAdmin
};

async function authenticate(userParam) {
    const user = await db.SearchDataMember(userParam.userid);
    console.log(user.length);
    if (user.length!=0) {
        var encryptItem = user[0].encrypt;
        if(userParam.password.length != 16-encryptItem.length){
            return false;
        }
        var text = userParam.password + encryptItem;
        var textBytes = aesjs.utils.utf8.toBytes(text);

        // The segment size is optional, and defaults to 1
        var segmentSize = 8;
        var aesCfb = new aesjs.ModeOfOperation.cfb(key, iv, segmentSize);
        var encryptedBytes = aesCfb.encrypt(textBytes);

        // To print or store the binary data, you may convert it to hex
        var encryptPwd = aesjs.utils.hex.fromBytes(encryptedBytes);
        console.log("login:" +encryptPwd)
        if (encryptPwd == user[0].password) {
            // create a jwt token that is valid for 7 days
            const token = jwt.sign({ sub: user[0].ID }, config.secret, { expiresIn: 86400 });

            return {
                ...omitPassword(user),
                token
            };
        }
    }
    return false;
}

async function getdatamember() {
    return JSON.stringify(await db.GetListMember());
}
async function addmember(userParam) {
    // validate
    if (await db.CheckID(userParam[0].value)) {
        throw 'Username "' + userParam[0].value + '" is already taken';
    }

    var encryptItem = makeid(16 - userParam[1].value.length)
    var text = userParam[1].value + encryptItem;
    var textBytes = aesjs.utils.utf8.toBytes(text);

    // The segment size is optional, and defaults to 1
    var segmentSize = 8;
    var aesCfb = new aesjs.ModeOfOperation.cfb(key, iv, segmentSize);
    var encryptedBytes = aesCfb.encrypt(textBytes);

    // To print or store the binary data, you may convert it to hex
    var encryptPwd = aesjs.utils.hex.fromBytes(encryptedBytes);
    console.log(encryptPwd)
    return (await db.AddMember(userParam, (userParam[6]) ? '1' : '0', encryptPwd, encryptItem))
}
async function checkAdmin(userid){
    console.log(await db.CheckAdmin(userid));
    return await db.CheckAdmin(userid);
}
function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
function omitPassword(user) {
    const { password, encrypt, ...userWithoutPassword } = user[0];
    return userWithoutPassword;
}