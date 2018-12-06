var pool = require('./databaseConfig.js');
var uuid = require('uuid/v4');
var admin = require('firebase-admin');

var serviceAccount = require("../serviceAccountKey.json");
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://acheryclubscore.firebaseio.com"
});


var penggunaDB = {
    cekStatus: function (FirebaseUID, callback) { 
        pool.getConnection(function (err, conn) {
            if (err) { 
                console.log(err); 
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                console.log(FirebaseUID);
                var sql = 'SELECT Status FROM pengguna WHERE FirebaseUID=?';
                conn.query(sql, [FirebaseUID], function (err, result) {
                    conn.release();
                     if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        console.log(result);
                        return callback(null, result);
                    }
                });
            }
        });
    },


    cekStatusPenggunabyEmail: function (Email, callback) { 
        pool.getConnection(function (err, conn) {
            if (err) { 
                console.log(err); 
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT Status FROM pengguna WHERE Email=?';
                conn.query(sql, [Email], function (err, result) {
                    conn.release();
                     if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        console.log(result);
                        return callback(null, result);
                    }
                });
            }
        });
    },


    getPenggunabyNama: function (Nama,callback) { 
        pool.getConnection(function (err, conn) {
            if (err) { 
                console.log(err); 
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT * FROM pengguna WHERE Nama=?';
                conn.query(sql, [Nama],function (err, result) {
                    conn.release();
                     if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        console.log(result);
                        return callback(null, result);
                    }
                });
            }
        });
    },


    
    getPengguna: function (Email, callback) { 
        pool.getConnection(function (err, conn) {
            if (err) { 
                console.log(err); 
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT * FROM pengguna WHERE Email=?';
                conn.query(sql, [Email], function (err, result) {
                    conn.release();
                     if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        console.log(result);
                        return callback(null, result);
                    }
                });
            }
        });
    }
    ,

    
    tambahAnggota: function (EmailKetua, Status, Nama, Email, Kelas, FirebaseUID, callback){
        pool.getConnection(function(err, conn){
            if (err){
                console.log(err);
                return callback(err,null);
            }
            else {
                var getIdKlub = 'SELECT IDKlub From pengguna WHERE Email=?';
                conn.query(getIdKlub, [EmailKetua], function(error, idklub){
                    console.log('idklub', idklub[0]);
                    var sql = 'INSERT INTO pengguna (Status, Nama, Email, Kelas, FirebaseUID, IDKlub) values (?,?,?,?,?,?)';
                    conn.query(sql, [Status, Nama, Email, Kelas, FirebaseUID, idklub[0]['IDKlub']], function (err, result){
                        conn.release();
                        if (err){
                            console.log(err);
                            return callback(err,null);
                        }
                        else {
                            console.log(result);
                            return callback(null, result);
                        }
                    });
                })
            }
        });
    }


    ,
    daftarKetua: function (Status, Nama, Email, Umur, FirebaseUID, NamaKlub, callback){
        pool.getConnection(function(err, conn){
            if (err){
                console.log(err);
                return callback(err,null);
            }
            else {
                let IDKlub = uuid();
                var sql = 'INSERT INTO pengguna (Status, Nama, Email, Umur, FirebaseUID, IDKlub) values (?,?,?,?,?, ?)';
                conn.query(sql,[Status, Nama, Email, Umur, FirebaseUID, IDKlub], function (error, result){
                    if (err){
                        console.log(error);
                        return callback(error,null);
                    }
                    else {
                        var sqlKlub = 'INSERT INTO klub (IDKlub, NamaKlub, Email) values (?,?,?)';
                        conn.query(sqlKlub, [IDKlub, NamaKlub, Email], function (err, res){
                            if (err){
                                console.log(err);
                                return callback(err,null);
                            } else {
                                var sqlKelas = 'INSERT INTO kelas (Kelas, MinimumNilai, IDKlub) values (?,?,?)';
                                conn.query(sqlKelas,["[5,10,15,20,30,40,50,60,70]", "[324,324,324,324,324,324,324,324,324]", IDKlub], function(err, res) {
                                    conn.release();
                                    if(err) {
                                        console.log(err);
                                        return callback(err,null);
                                    } else {
                                        console.log(err);
                                        return callback(err,null);
                                    }
                                })
                            }  
                        });
                    }
                });
            }
        });
    }


    ,
    daftarAnggotaPelatih: function (Status, Nama, Email, Umur, FirebaseUID, NamaKlub, callback){
        pool.getConnection(function(err, conn){
            if (err){
                console.log(err);
                return callback(err,null);
            }
            else {
                let IDKlub = uuid();
                var sql = 'INSERT INTO pengguna (Status, Nama, Email, Umur, FirebaseUID, IDKlub) values (?,?,?,?,?, ?)';
                conn.query(sql,[Status, Nama, Email, Umur, FirebaseUID, IDKlub], function (error, result){
                    if (err){
                        console.log(error);
                        return callback(error,null);
                    }
                    else {
                        var sqlKlub = 'INSERT INTO klub (IDKlub, NamaKlub, Email) values (?,?,?)';
                        conn.query(sqlKlub, [IDKlub, NamaKlub, Email], function (err, res){
                            conn.release();
                            if (err){
                                console.log(err);
                                return callback(err,null);
                            } else {
                                return callback(null, res);
                            }  
                        });
                    }
                });
            }
        });
    }


    ,
    editDataDiri: function (Nama, Umur, TinggiBadan, JenisBusur, PanjangBusur, KekuatanBusur, Email, callback){
        pool.getConnection(function(err,conn){
            if (err){
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'UPDATE pengguna SET Nama=?,Umur=?, TinggiBadan=?, JenisBusur=?, PanjangBusur=?, KekuatanBusur=? WHERE Email=?';
                conn.query(sql, [Nama, Umur, TinggiBadan, JenisBusur, PanjangBusur, KekuatanBusur, Email], function (err, result){
                    conn.release();
                    if(err){
                        console.log(err);
                        return callback(err, null);
                    } else {
                        console.log(result);
                        return callback(null, result);
                    }
                });
            }
        });
    }


    ,
    editDataKetuaPelatih: function (Nama, Umur, Email, callback){
        pool.getConnection(function(err,conn){
            if (err){
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                console.log(Nama+", "+Umur+", "+Email)
                var sql = 'UPDATE pengguna SET Nama=?, Umur=? WHERE Email=?';
                conn.query(sql, [Nama, Umur, Email], function (err, result){
                    conn.release();
                    if(err){
                        console.log(err);
                        return callback(err, null);
                    } else {
                        console.log(result);
                        return callback(null, result);
                    }
                });
            }
        });
    }
    ,
    hapusPengguna: function (Email, callback){
        pool.getConnection(function (err, conn){
            if(err){
                console.log(err);
                return callback(err, null);
            }
            else {
                var sql = "SELECT * FROM pengguna WHERE Email=?";
                conn.query(sql, [Email], function(err, pengguna){
                    if (err){
                        return callback(err, null);
                    } else {
                        var sql2 = "DELETE FROM pengguna WHERE Email=?";
                        var uid = pengguna[0]['FirebaseUID'];
                        conn.query(sql2, [Email], function(err, result ){
                            conn.release();
                            admin.auth().deleteUser(uid).then(res => {
                                return callback(null, res);
                            }).catch(err => {
                                return callback(null, err)
                            })
                        })
                    }
                });
            }
        });
    }
};
module.exports = penggunaDB
