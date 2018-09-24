var pool = require('./databaseConfig.js');
var klubDB = { 
    getKlub: function(callback) { 
        pool.getConnection(function (err, conn) {
            if (err) { 
                console.log(err); 
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT * FROM klub';
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


    getDataKlub: function (Email, callback) { 
        pool.getConnection(function (err, conn) {
            if (err) { 
                console.log(err); 
                return callback(err, null);
            }
            else {
                var getIdKlub = 'SELECT IDKlub FROM pengguna WHERE Email=?';
                conn.query(getIdKlub, [Email], function(err, idklub){
                    var sql = 'SELECT * FROM klub WHERE IDKlub=?';
                    conn.query(sql, [idklub[0]['IDKlub']], function (err, result) {
                        conn.release();
                         if (err) {
                            console.log(err);
                            return callback(err, null);
                        } else {
                            return callback(null, result);
                        }
                    });
                })
            }
        });
    }

    ,
    
    
    editKlub: function (NamaKlub, IDKlub, callback){
        pool.getConnection(function(err,conn){
            if (err){
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                console.log(NamaKlub+", "+IDKlub)
                var sql = 'UPDATE klub SET NamaKlub=? WHERE IDKlub=?';
                conn.query(sql, [NamaKlub, IDKlub], function (err, result){
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

    // ,
    // hapusKlub: function (ID_Klub, callback){
    //     pool.getConnection(function (err, conn){
    //         if(err){
    //             console.log(err);
    //             return callback(err, null);
    //         }
    //         else {
    //             console.log("Connected!");
    //             var sql = 'DELETE FROM klub WHERE ID_Klub=?';
    //             conn.query(sql, [ID_Klub], function(err, result){
    //                 conn.release();
    //                 if (err){
    //                     console.log(err);
    //                     return callback(err, null);
    //                 } else {
    //                     console.log(result);
    //                     return callback (null, result);
    //                 }
    //             });
    //         }
    //     });
    // } 

    //,
    // tambahKlub: function (NamaKlub, callback){
    //     pool.getConnection(function(err, conn){
    //         if (err){
    //             console.log(err);
    //             return callback(err,null);
    //         }
    //         else {
    //             console.log("Connected!");
    //             var sql = 'INSERT INTO klub (NamaKlub) values (?)';
    //             conn.query(sql,[NamaKlub], function (err, result){
    //                 conn.release();
    //                 if (err){
    //                     console.log(err);
    //                     return callback(err,null);
    //                 }
    //                 else {
    //                     console.log(result);
    //                     return callback(null, result);
    //                 }
    //             });
    //         }
    //     });
    // }

};
module.exports = klubDB
