var pool = require('./databaseConfig.js');
var nilaiDB = { 
    getNilai: function (EmailPengguna, callback) { 
        pool.getConnection(function (err, conn) {
            if (err) { 
                console.log(err); 
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT * FROM nilai where EmailPengguna=? AND Tanggal="2018-09-31"';
                conn.query(sql, [EmailPengguna], function (err, result) {
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

    getTanggal:function(EmailPengguna, callback){
        pool.getConnection(function (err, conn) {
            if (err) { 
                console.log(err); 
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT Tanggal FROM nilai where EmailPengguna=?';
                conn.query(sql, [EmailPengguna], function (err, result) {
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


    getDataNilai: function (callback) { 
        pool.getConnection(function (err, conn) {
            if (err) { 
                console.log(err); 
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT * FROM nilai';
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
    },

    
    tambahNilai: function (Tanggal, TotalRambahan1, TotalRambahan2, TotalRambahan3, TotalRambahan4, TotalRambahan5, TotalRambahan6, EmailPengguna,callback){
        pool.getConnection(function(err, conn){
            if (err){
                console.log(err);
                return callback(err,null);
            }
            else {
                console.log("Connected!");
                var sql = 'INSERT INTO nilai (Tanggal, TotalRambahan1, TotalRambahan2, TotalRambahan3, TotalRambahan4, TotalRambahan5, TotalRambahan6, EmailPengguna) values (?,?,?,?,?,?,?,?)';

                conn.query(sql,[Tanggal, TotalRambahan1, TotalRambahan2, TotalRambahan3, TotalRambahan4, TotalRambahan5, TotalRambahan6, EmailPengguna], function (err, result){
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
};
module.exports = nilaiDB
