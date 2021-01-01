const db = require('../database/database');
exports.addDevice =  (data) => {
    return db.addDevice(data);
}
exports.getListDevices =  (begin, end) => {
    return db.getListDevices(begin, end);
}
exports.countDevices =  () => {
    return db.countDevices();
}
exports.getSingleDevice =  (ID) => {
    return db.getSingleDevice(ID);
}