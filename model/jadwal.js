var pool = require('./databaseConfig.js');
var jadwalDB = { 
    getJadwal: function x(callback) { 
        pool.getConnection(function (err, conn) {
            if (err) { 
                console.log(err); 
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT * FROM jadwal';
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
    tambahJadwalLatihan: function (Tanggal, Waktu, Deskripsi, callback){
        pool.getConnection(function(err, conn){
            if (err){
                console.log(err);
                return callback(err,null);
            }
            else {
                console.log("Connected!");
                var sql = 'INSERT INTO jadwal (JenisJadwal, Tanggal, Waktu, Deskripsi) values ("Jadwal Latihan",?,?,?)';
                conn.query(sql,[Tanggal, Waktu, Deskripsi], function (err, result){
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
    editJadwalLatihan: function (Tanggal, Waktu, Deskripsi, ID_Jadwal, callback){
        pool.getConnection(function(err,conn){
            if (err){
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                console.log(Tanggal+", "+Waktu+", "+Deskripsi+", "+ID_Jadwal)
                var sql = 'UPDATE jadwal SET Tanggal=?, Waktu=?, Deskripsi=? WHERE ID_Jadwal=?';
                conn.query(sql, [Tanggal, Waktu, Deskripsi, ID_Jadwal], function (err, result){
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
    hapusJadwalLatihan: function (ID_Jadwal, callback){
        pool.getConnection(function (err, conn){
            if(err){
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'DELETE FROM jadwal WHERE ID_Jadwal=?';
                conn.query(sql, [ID_Jadwal], function(err, result){
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

    
    ,
    getJadwalAmbilNilai: function (callback) { 
        pool.getConnection(function (err, conn) {
            if (err) { 
                console.log(err); 
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT * FROM jadwal';
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
    tambahJadwalAmbilNilai: function (Tanggal, Waktu, Deskripsi, callback){
        pool.getConnection(function(err, conn){
            if (err){
                console.log(err);
                return callback(err,null);
            }
            else {
                console.log("Connected!");
                var sql = 'INSERT INTO jadwal (JenisJadwal, Tanggal, Waktu, Deskripsi) values ("Jadwal Ambil Nilai",?,?,?)';
                conn.query(sql,[Tanggal, Waktu, Deskripsi], function (err, result){
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
    editJadwalAmbilNilai: function (Tanggal, Waktu, Deskripsi, ID_Jadwal, callback){
        pool.getConnection(function(err,conn){
            if (err){
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                console.log(Tanggal+", "+Waktu+", "+Deskripsi+", "+ID_Jadwal)
                var sql = 'UPDATE jadwal SET Tanggal=?, Waktu=?, Deskripsi=? WHERE ID_Jadwal=?';
                conn.query(sql, [Tanggal, Waktu, Deskripsi, ID_Jadwal], function (err, result){
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
    hapusJadwalAmbilNilai: function (ID_Jadwal, callback){
        pool.getConnection(function (err, conn){
            if(err){
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'DELETE FROM jadwal WHERE ID_Jadwal=?';
                conn.query(sql, [ID_Jadwal], function(err, result){
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
module.exports = jadwalDB
