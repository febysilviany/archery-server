var pool = require('./databaseConfig.js');
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
                var sql = 'SELECT Status FROM pengguna2 WHERE FirebaseUID=?';
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
                var sql = 'SELECT * FROM pengguna2 WHERE Nama=?';
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


    
    getPengguna: function (callback) { 
        pool.getConnection(function (err, conn) {
            if (err) { 
                console.log(err); 
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT * FROM pengguna2';
                conn.query(sql, function (err, result) {
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
    tambahPengguna: function (Status, Nama, Email, Umur, FirebaseUID, callback){
        pool.getConnection(function(err, conn){
            if (err){
                console.log(err);
                return callback(err,null);
            }
            else {
                console.log("Connected!");
                var sql = 'INSERT INTO pengguna2 (Status, Nama, Email, Umur, FirebaseUID) values (?,?,?,?,?)';
                conn.query(sql,[Status, Nama, Email,Umur, FirebaseUID], function (err, result){
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
            }
        });
    }


    ,
    daftarKetua: function (Status, Nama, Email, Umur, FirebaseUID, callback){
        pool.getConnection(function(err, conn){
            if (err){
                console.log(err);
                return callback(err,null);
            }
            else {
                console.log("Connected!");
                var sql = 'INSERT INTO pengguna2 (Status, Nama, Email, Umur, FirebaseUID) values (?,?,?,?,?)';
                conn.query(sql,[Status, Nama, Email, Umur, FirebaseUID], function (err, result){
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
                var sql = 'UPDATE pengguna2 SET Nama=?, Password=?, Umur=?, TinggiBadan=?, JenisBusur=?, PanjangBusur=?, KekuatanBusur=? WHERE Email=?';
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
    hapusPengguna: function (Email, callback){
        pool.getConnection(function (err, conn){
            if(err){
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'DELETE FROM pengguna2 WHERE Email=?';
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
