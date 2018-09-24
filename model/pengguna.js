var pool = require('./databaseConfig.js');
var uuid = require('uuid/v4');
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


    
    getPenggunabyEmail: function (Email, callback) { 
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

    
    tambahPengguna: function (Status, Nama, Email, FirebaseUID, callback){
        pool.getConnection(function(err, conn){
            if (err){
                console.log(err);
                return callback(err,null);
            }
            else {
                // console.log("Connected!");
                // var sql = 'INSERT INTO pengguna (Status, Nama, Email, Umur, FirebaseUID) values (?,?,?,?,?)';
                // conn.query(sql,[Status, Nama, Email,Umur, FirebaseUID], function (err, result){
                //     conn.release();
                //     if (err){
                //         console.log(err);
                //         return callback(err,null);
                //     }
                //     else {
                //         console.log(result);
                //         return callback(null, result);
                //     }
                // });
                var getIdKlub = 'SELECT IDKlub From pengguna WHERE Email=?';
                conn.query(getIdKlub, [Email], function(error, idklub){
                    var sql = 'INSERT INTO pengguna (Status, Nama, Email,FirebaseUID, IDKlub) values (?,?,?,?,?)';
                    conn.query(sql, [Status, Nama, Email, FirebaseUID, idklub[0]['IDKlub']], function (err, result){
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
    editDataDiri: function (Nama, Password, Umur, TinggiBadan, JenisBusur, PanjangBusur, KekuatanBusur, Email, callback){
        pool.getConnection(function(err,conn){
            if (err){
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                console.log(Nama+", "+Password+", "+Umur+", "+TinggiBadan+", "+JenisBusur+", "+PanjangBusur+", "+KekuatanBusur+", "+Email)
                var sql = 'UPDATE pengguna SET Nama=?, Password=?, Umur=?, TinggiBadan=?, JenisBusur=?, PanjangBusur=?, KekuatanBusur=? WHERE Email=?';
                conn.query(sql, [Nama, Password, Umur, TinggiBadan, JenisBusur, PanjangBusur, KekuatanBusur, Email], function (err, result){
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
                console.log("Connected!");
                var sql = 'DELETE FROM pengguna WHERE Email=?';
                conn.query(sql, [Email], function(err, result){
                    conn.release();
                    if (err){
                        console.log(err);
                        return callback(err, null);
                    } else {
                        console.log(result);
                        return callback (null, result);
                    }
                });
            }
        });
    }
};
module.exports = penggunaDB
