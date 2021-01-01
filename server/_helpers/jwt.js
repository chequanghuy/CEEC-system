const expressJwt = require('express-jwt');
const config = require('../config.json');

module.exports = jwt;

function jwt() {
    const { secret } = config;
    return expressJwt({
        secret,
        getToken: function fromHeaderOrQuerystring(req) {
            if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
                console.log("header autho");
                return req.headers.authorization.split(' ')[1];
            } 
            else if (req.query && req.query.token) {
                console.log("query");
                return req.query.token;
            }
            else if (req.cookies["access-token"]){
                console.log("cookie");
                return req.cookies["access-token"];
            }
            return null;
        }
    }).unless({
        path: [
            // public routes that don't require authentication
            '/',
            '/authenticate',
            // '/mainpage',
            '/getdatamember',
            '/addmember',
            '/test'
        ]
    });
}
