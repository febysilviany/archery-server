var pool = require('./databaseConfig.js');
var kelasDB = { 
    getKelas: function (Email, callback) { 
        pool.getConnection(function (err, conn) {
            if (err) { 
                console.log(err); 
                return callback(err, null);
            }
            else {
                var getPenggunaKlub = 'SELECT IDKlub FROM pengguna WHERE Email=?';
                conn.query(getPenggunaKlub, [Email], function(err, idklub){
                    console.log('idklub',idklub)
                    var sql = 'SELECT * FROM kelas WHERE IDKlub=?';
                    conn.query(sql, [idklub[0]['IDKlub']], function (err, result) {
                        conn.release();
                         if (err) {
                            console.log(err);
                            return callback(err, null);
                        } else {
                            console.log(result);
                            return callback(null, result);
                        }
                    });
                })
            }
        });
    }

    ,

    editMinimumKelas: function (MinimumNilai, IDKlub, callback){
        pool.getConnection(function(err,conn){
            if (err){
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'UPDATE kelas SET MinimumNilai=? WHERE IDKlub=?';
                conn.query(sql, [`[${MinimumNilai}]`, IDKlub], function (err, result){
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
    },


    editKelasAnggota: function (Kelas, Email, callback){
        pool.getConnection(function(err,conn){
            if (err){
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'UPDATE pengguna SET Kelas=? WHERE Email=?';
                conn.query(sql, [Kelas, Email], function (err, result){
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

};
module.exports = kelasDB
