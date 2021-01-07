const mysql = require('mysql');
const dotenvn = require('dotenv').config();
var con = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: "userinfomationdb"
  });
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected database success!")
  });
exports.AddMember = function(data, admin, encryptPwd, encryptItem){
  return new Promise (function(resolve, reject){
    var arrdata = [
      data[2].value,
      data[0].value,
      encryptPwd,
      data[5].value,
      data[3].value,
      data[4].value,
      admin,
      encryptItem
    ]
    var sql = "insert into personalinfo values (?);";
    con.query(sql,[arrdata], function(err, result){
      if (err) {
        console.log(err);
        resolve(false);
      }
      else{
        console.log("1 data inserted");
        resolve(true);
      }
    })
  })
}
exports.SearchDataMember = function (id) {
	return new Promise (function (resolve, reject) {
    var sql = "select Name,ID,password,encrypt, admin from personalinfo where ID = ? ;";
		con.query(sql,[id] ,function(err, rows, fields) {
			if (err) reject(err);
			else resolve(rows);
		});
	});
}
exports.GetListMember = function () {
	return new Promise (function (resolve, reject) {
		con.query("select Name, ID from personalinfo order by Name;", function(err, rows, fields) {
			if (err) reject(err);
			else resolve(rows);
		});
	});
}
exports.CountMember = function(){
  return new Promise(function(resolve, reject){
    con.query("select COUNT(*) as total from personalinfo;", function(err, result){
      if (err) reject(err);
      else
        resolve(result[0].total);
    })
  })
}
exports.CheckCardID = function (cardID) {
	return new Promise (function (resolve, reject) {
    query_item = "EXISTS(SELECT * from personalinfo WHERE CardID= ? )"
		con.query("SELECT "+query_item+" as bool;",[cardID], function(err, result, fields) {
			if (err) reject(err);
			else resolve(result[0].bool);
		});
	});
}
exports.CheckID = function (ID) {
	return new Promise (function (resolve, reject) {
    query_item = "EXISTS(SELECT * from personalinfo WHERE ID= ? )"
		con.query("SELECT "+query_item+" as bool;",[ID], function(err, result, fields) {
			if (err) reject(err);
			else resolve(result[0].bool);
		});
	});
}
exports.CheckAdmin = function (userdata) {
	return new Promise (function (resolve, reject) {
    query_item = "EXISTS(SELECT * from personalinfo WHERE Name= ? AND ID = ? AND admin = ? )"
		con.query("SELECT "+query_item+" as bool;",[userdata.Name, userdata.ID, userdata.admin], function(err, result, fields) {
			if (err) reject(err);
			else resolve(result[0].bool);
		});
	});
}
