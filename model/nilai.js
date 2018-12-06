var pool = require('./databaseConfig.js');
var nilaiDB = { 
    getNilai: function (EmailPengguna, Tanggal, callback) { 
        pool.getConnection(function (err, conn) {
            if (err) { 
                console.log(err); 
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT * FROM nilai WHERE EmailPengguna=? AND Tanggal=?';
                conn.query(sql, [EmailPengguna, Tanggal], function (err, result) {
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


    getNilaiVerifikasi: function (EmailPengguna, Tanggal, callback) { 
        pool.getConnection(function (err, conn) {
            if (err) { 
                console.log(err); 
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT * FROM nilai where EmailPengguna=? and Tanggal=? AND Status="Belum Terverifikasi"';
                conn.query(sql, [EmailPengguna, Tanggal], function (err, result) {
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

    cariNamaAnggota: function (Nama, callback) { 
        pool.getConnection(function (err, conn) {
            if (err) { 
                console.log(err); 
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT * FROM pengguna where Nama=? ';
                conn.query(sql, [Nama], function (err, result) {
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


    getDataNilai: function (Tanggal, callback) { 
        pool.getConnection(function (err, conn) {
            if (err) { 
                console.log(err); 
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT a.*, b.* FROM pengguna a left join nilai b on a.Email = b.EmailPengguna WHERE b.Tanggal=? AND b.Status="Belum Terverifikasi"';
                conn.query(sql, [Tanggal], function (err, result) {
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

    //nilai anggota per bulan
    getDataNilaiPerbulan: function (Email, Bulan, Tahun, callback) { 
        pool.getConnection(function (err, conn) {
            if (err) { 
                console.log(err); 
                return callback(err, null);
            }
            else {
                var sql = 'SELECT * from nilai where EmailPengguna=? AND MONTH(Tanggal)=? AND YEAR(Tanggal)=? ';
                conn.query(sql, [Email, Bulan, Tahun], function (err, result) {
                    conn.release();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        return callback(null, result);
                    }
                });
            }
        });
    },


    getTotalNilaiPerBulan: function (Email, Bulan, Tahun, callback) { 
        pool.getConnection(function (err, conn) {
            if (err) { 
                console.log(err); 
                return callback(err, null);
            }
            else {
                var sql = 'SELECT a.*, sum(b.TotalNilai) as nilaiTotal from pengguna a left join nilai b on a.Email = b.EmailPengguna where b.EmailPengguna=? AND MONTH(b.Tanggal)=? AND YEAR(b.Tanggal)=?';
                conn.query(sql, [Email, Bulan, Tahun], function (err, result) {
                    conn.release();
                        if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        return callback(null, result);
                    }
                });
            }
        });
    },


    getNamaAnggota: function (Email, callback) { 
        pool.getConnection(function (err, conn) {
            if (err) { 
                console.log(err); 
                return callback(err, null);
            }
            else {
                var getPenggunaKlub = 'SELECT IDKlub FROM pengguna WHERE Email=?';
                conn.query(getPenggunaKlub, [Email], function(err, idklub){
                    var sql = 'SELECT * FROM pengguna WHERE IDKlub=? and Status="Anggota Klub"';
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

    getDetailNilai: function (EmailPengguna, Tanggal, callback) { 
        pool.getConnection(function (err, conn) {
            if (err) { 
                console.log(err); 
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT * FROM nilai where EmailPengguna=? AND Tanggal=? ';
                conn.query(sql, [EmailPengguna, Tanggal], function (err, result) {
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

    getNilaiPerBulan: function (EmailPengguna, Bulan, Tahun, Tanggal, callback) { 
        pool.getConnection(function (err, conn) {
            if (err) { 
                console.log(err); 
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT * FROM nilai where EmailPengguna=? AND Tanggal=? ';
                conn.query(sql, [EmailPengguna, Tanggal], function (err, result) {
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
    

    verifNilai: function (TotalNilai, EmailPengguna, Tanggal, callback) { 
        pool.getConnection(function (err, conn) {
            if (err) { 
                console.log(err); 
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'UPDATE nilai SET Status="Terverifikasi", TotalNilai=? WHERE EmailPengguna=? AND Tanggal=?';
                conn.query(sql, [TotalNilai, EmailPengguna, Tanggal], function (err, result) {
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

    
    tambahNilai: function (Tanggal, TotalRambahan1, TotalRambahan2, TotalRambahan3, TotalRambahan4, TotalRambahan5, TotalRambahan6, EmailPengguna, Status, callback){
        pool.getConnection(function(err, conn){
            if (err){
                console.log(err);
                return callback(err,null);
            }

            else {
                var getIdKlub = 'SELECT IDKlub From pengguna WHERE Email=?';
                conn.query(getIdKlub, [EmailPengguna], function(error, idklub){
                    if(error){
                        return callback(err,null);
                    }  else {
                        var sql = 'INSERT INTO nilai (Tanggal, TotalRambahan1, TotalRambahan2, TotalRambahan3, TotalRambahan4, TotalRambahan5, TotalRambahan6, EmailPengguna, IDKlub, Status) values (?,?,?,?,?,?,?,?,?,"Belum Terverifikasi")';
                        conn.query(sql,[Tanggal, TotalRambahan1, TotalRambahan2, TotalRambahan3, TotalRambahan4, TotalRambahan5, TotalRambahan6 , EmailPengguna, idklub[0]['IDKlub'], Status], function (err, result){
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
                
                })
            }
           
        });
    },


    getPeringkatNilaiPerTanggal: function (EmailPengguna, Tanggal, callback) { 
        pool.getConnection(function (err, conn) {
            if (err) { 
                console.log(err); 
                return callback(err, null);
            }
            else {
                var getIdKlub = 'SELECT IDKlub From pengguna WHERE Email=?';
                conn.query(getIdKlub, [EmailPengguna], function(error, idklub){
                    if(error){
                        return callback(err,null);
                    }  else {
                        // var sql = 'SELECT EmailPengguna, TotalNilai, @rank := IF( @current_Tanggal = Tanggal, @country_rank +1, 1 ) AS ranking, @current_Tanggal := Tanggal FROM nilai WHERE Status="Terverifikasi" AND IDKlub=? AND Tanggal=? AND EmailPengguna=? ORDER BY Tanggal, TotalNilai DESC';
                        var sql ='SELECT @current_tanggal := null; SELECT EmailPengguna,Tanggal, TotalNilai, @current_rank := IF(@current_tanggal = Tanggal, @current_rank + 1, 1) AS ranking,  @current_tanggal := Tanggal FROM nilai WHERE IDKlub=? AND Tanggal=? and EmailPengguna=? ORDER BY Tanggal, TotalNilai DESC';
                        conn.query(sql, [idklub[0]['IDKlub'], Tanggal, EmailPengguna], function (err, result){
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
                
                })
            }
        });
    },



    //peringkat anggota perbulan sisi pelatih dan ketua
    getPeringkatAnggotaPerBulan: function (EmailPengguna, Bulan, Tahun, callback) { 
        pool.getConnection(function (err, conn) {
            if (err) { 
                console.log(err); 
                return callback(err, null);
            }
            else {
                var getPenggunaKlub = 'SELECT IDKlub FROM pengguna WHERE Email=?';
                conn.query(getPenggunaKlub, [EmailPengguna], function(err, idklub){
                    // var sql = 'SELECT a.*, sum(b.TotalNilai) as nilaiTotal from pengguna a left join nilai b on a.Email = b.EmailPengguna WHERE b.Status="Terverifikasi" AND MONTH(b.Tanggal)=? AND YEAR(b.Tanggal)=? AND b.IDKlub=? ORDER BY nilaiTotal DESC';

                    var sql = 'SELECT pengguna.Email, pengguna.Nama,  (SELECT SUM(TotalNilai) FROM nilai WHERE nilai.EmailPengguna = pengguna.Email AND MONTH(nilai.Tanggal)=? AND YEAR(nilai.Tanggal)=?) AS nilaiTotal FROM pengguna WHERE pengguna.IDKlub=? AND pengguna.Status="Anggota Klub" ORDER BY nilaiTotal DESC';
                    
                    conn.query(sql, [Bulan, Tahun, [idklub[0]['IDKlub']]], function (err, result) {
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
    },

    //peringkat anggota per tanggal sisi pelatih dan ketua
    getPeringkatAnggotaPerTanggal: function (EmailPengguna, Tanggal, callback) { 
        pool.getConnection(function (err, conn) {
            if (err) { 
                console.log(err); 
                return callback(err, null);
            }
            else {
                var getPenggunaKlub = 'SELECT IDKlub FROM pengguna WHERE Email=?';
                conn.query(getPenggunaKlub, [EmailPengguna], function(err, idklub){
                    var sql = 'SELECT a.Email, a.Nama, b.TotalNilai FROM pengguna a left join nilai b on a.Email = b.EmailPengguna WHERE b.Status="Terverifikasi" AND a.Status="Anggota Klub" AND b.Tanggal=? AND b.IDKlub=? ORDER BY b.TotalNilai DESC';
                    conn.query(sql, [Tanggal, [idklub[0]['IDKlub']]], function (err, result) {
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
    },


    getDetailDataAnggota: function (Email, Bulan, Tahun, callback) { 
        pool.getConnection(function (err, conn) {
            if (err) { 
                console.log(err); 
                return callback(err, null);
            }
            else {
                var sql = 'SELECT a.*, sum(b.TotalNilai) as nilaiTotal from pengguna a left join nilai b on a.Email = b.EmailPengguna where b.Status="Terverifikasi" AND MONTH(b.Tanggal)=? AND YEAR(b.Tanggal)=? AND a.Email=?';
                conn.query(sql, [Bulan, Tahun, Email], function (err, result) {
                    conn.release();
                        if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        return callback(null, result);
                    }
                });
            }
        });
    },

    //nilai anggota per bulan
    // getDataNilaiPerbulan: function (Email, Bulan, Tahun, callback) { 
    //     pool.getConnection(function (err, conn) {
    //         if (err) { 
    //             console.log(err); 
    //             return callback(err, null);
    //         }
    //         else {
    //             var sql = 'SELECT * from nilai where EmailPengguna=? AND MONTH(Tanggal)=? AND YEAR(Tanggal)=? ';
    //             conn.query(sql, [Email, Bulan, Tahun], function (err, result) {
    //                 conn.release();
    //                 if (err) {
    //                     console.log(err);
    //                     return callback(err, null);
    //                 } else {
    //                     return callback(null, result);
    //                 }
    //             });
    //         }
    //     });
    // },

    getRankingByNilai: function (Email, Tanggal, callback){
        pool.getConnection(function(err,conn){
            if(err){
                console.log(err);
                return callback(err, null);
            }else {
                var getPenggunaKlub = 'SELECT IDKlub FROM pengguna WHERE Email=?';
                conn.query(getPenggunaKlub, [Email], function(err, idklub){
                    var sql = 'SELECT * FROM nilai WHERE Tanggal=? AND IDKlub=? SORT BY TotalNilai';
                    
                    conn.query(sql, [Ranking, [idklub[0]['IDKlub']]], function(err, result){
                        conn.release();
                        if(err){
                            console.log(err);
                            return callback(err, null);
                        } else {
                            return callback(null, result);
                        }
                    })
                })
            }
        });
    }
};

module.exports = nilaiDB
