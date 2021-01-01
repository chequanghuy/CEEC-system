const express = require('express');
const dotenv = require('dotenv').config();
const axios = require('axios');
const jwt = require('./_helpers/jwt');
const errorHandler = require('./_helpers/error-handler');
const app = express();
const server = require('http').createServer(app);
const cookieParser = require('cookie-parser');
var aesjs = require('aes-js');
var expressSession = require('express-session');
var io = require('socket.io')(server);
var chartjs = require('chart.js')
const db = require('./database/database');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const url = "localhost"
app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(cookieParser());
let routes = require('./api/routes'); // importing route
// app.use(jwt());
app.use('/', routes);
// app.use(errorHandler);
var mode = "default";
var status = "off";

io.on('connection', (socket) => {
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log("client connect " + time);
    io.to(socket.id).emit('status-door', status);
    io.to(socket.id).emit('status-mode', mode);
    socket.on('send-data', (msg) => {
        console.log('message: ' + msg);
    });
    socket.on('open-door', () => {
        console.log('mo cua');        // gửi sự kiện open-door qua esp bên ngoài
        status = 'on';
        socket.broadcast.emit('status-door', status);
        socket.emit('open-door');
    });
    socket.on('close-door', () => {
        console.log('dong cua');                               // gửi sự kiện open-door qua esp bên ngoài
        status = 'off';
        socket.broadcast.emit('status-door', status);
        socket.emit('close-door');
    });
    socket.on('swipe-card', async (msg)=>{
        if(msg === "null"){
            console.log("null roi");
        }
        else {
            
            if(await db.CheckCardID(msg)){
                console.log('the dung' + msg);
                socket.emit('open-door');
                status = 'on';
                socket.broadcast.emit('status-door', status);
            }
            else{
                console.log('the sai'+ msg );
                socket.emit('card-id-error');
            }
        }
    });
    socket.on('allow-add-card', () => {
        console.log('allow add')
        // setInterval(
        //     () => {
        //         socket.emit('new-card', "idcard");
        //         console.log('done');
        //     },
        //     8000
        // )
        socket.broadcast.emit('allow-add-card');
    });
    socket.on('new-card', async (msg) => {
        if(await db.CheckCardID(msg)){
            socket.emit('card-id-error');
        }
        else{

            socket.broadcast.emit('new-card', msg);
        }
    });
    socket.on('data-srf',(msg)=>{
        today = new Date();
        time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        console.log(msg + ' ' + time);
        if(mode == "default")
        {
            if (msg <= 5 && msg > 1){
                socket.emit('close-door');
                status = 'off';
                socket.broadcast.emit('status-door', status);
            }
        }     
    });
    socket.on('status-mode', (msg) => {
        console.log(msg);
        mode = msg;
        socket.broadcast.emit('status-mode', msg);
    });
    // socket.on('status-door', (msg) => {
    //     socket.broadcast.emit(msg);
    // })
    socket.on('disconnect', () => {
        today = new Date();
        time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        console.log('user disconnected ' + time);
    })
    setInterval(() => {
        io.emit('change', 'Message from server');
        // console.log('server-send');
    }, 3000)
    socket.on('angular', (data) => {
        console.log(data);
    })
    var z = 0;
    socket.on('esp-send', (data) => {
        console.log(data + " " + z);
        z++;
    })
})
var connected_users={};
// server.on('connection',function(socket){
//     socket.__fd=socket.fd;
//     connected_users[socket.__fd]=socket.remoteAddress;
//     console.log(connected_users);
//     socket.on('close',function(){
//         delete connected_users[socket.__fd];
//         console.log(connected_users);
//     }); 
// });
server.listen(8000, url, ()=>{
    console.log("Server Running...")
});
