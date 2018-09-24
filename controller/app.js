//request
var pengguna = require('../model/pengguna');
var jadwal = require('../model/jadwal');
var nilai = require('../model/nilai');
var klub = require('../model/klub');

//express
var express = require('express');
var app = express();

//parser
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

//path
var path = require('path');

//cors
var cors = require("cors")
var cor = cors();
app.use(cor);

//define path
app.use(express.static(path.join(__dirname, "../public")));


//routing get status pengguna
app.get('/api/cekstatus/:firebaseuid', function(req, res) {
    pengguna.cekStatus(req.params.firebaseuid, function(err,result){
        if(!err){
            console.log(result);
            res.send(result);
        }
        else {
            console.log(err);
            res.status(500).send(err.code);
        }
    })
})


//routing get data pengguna berdasarkan nama
app.get('/api/NamaPengguna/:Nama', function (req, res) {
    var Nama = req.params.Nama;
    pengguna.getPenggunabyNama(Nama, function(err, result){
        if (!err) {
            res.send(result);
        }
        else {
            console.log(err);
            res.status(500).send(err);
        }
    });
});


//routing get data pengguna
app.get('/api/pengguna/:Email', function (req, res) {
    var Email = req.params.Email;
    pengguna.getPenggunabyEmail(Email, function(err, result){
        if (!err) {
            res.send(result);
        }
        else {
            console.log(err);
            res.status(500).send(err);
        }
    });
});


//routing daftar ketua
app.post('/api/ketua', urlencodedParser, jsonParser, function (req,res){
    var Nama = req.body.Nama;
    var Email = req.body.Email;
    var FirebaseUID = req.body.FirebaseUID;
    var Umur = req.body.Umur;
    var NamaKlub = req.body.NamaKlub;
    pengguna.daftarKetua("Ketua Klub", Nama, Email, Umur, FirebaseUID, NamaKlub, function(err, result){
        if(!err){
            console.log(result);
            res.send(result.affectedRows + ' record ditambahkan');
        }
        else {
            console.log(err);
            res.status(500).send(err.code);
        }
    });
});


//routing daftar anggota atau pelatih
app.post('/api/anggotapelatih', urlencodedParser, jsonParser, function (req,res){
    var Status = req.body.Status;
    var Nama = req.body.Nama;
    var Email = req.body.Email;
    var FirebaseUID = req.body.FirebaseUID;
    var Umur = req.body.Umur;
    var NamaKlub = req.body.NamaKlub;
    pengguna.daftarAnggotaPelatih(Status, Nama, Email, Umur, FirebaseUID, NamaKlub, function(err, result){
        if(!err){
            console.log(result);
            res.send(result.affectedRows + ' record ditambahkan');
        }
        else {
            console.log(err);
            res.status(500).send(err.code);
        }
    });
});


//routing tambah pengguna
app.post('/api/tambahpengguna', urlencodedParser, jsonParser, function (req,res){
    var Status = req.body.Status;
    var Nama = req.body.Nama;
    var Email = req.body.Email;
    //var Umur = req.body.Umur;
    var FirebaseUID = req.body.FirebaseUID;

    pengguna.tambahPengguna(Status, Nama, Email, FirebaseUID, function(err, result){
        if(!err){
            console.log(result);
            res.send(result.affectedRows + ' record ditambahkan');
        }
        else {
            console.log(err);
            res.status(500).send(err.code);
        }
    });
});



//routing edit data diri
app.post('/api/pengguna/:Email', urlencodedParser, jsonParser, function(req,res){
    var Nama = req.body.Nama;
    var Password = req.body.Password;
    var Umur = req.body.Umur;
    var TinggiBadan = req.body.TinggiBadan;
    var JenisBusur = req.body.JenisBusur;
    var PanjangBusur = req.body.PanjangBusur;
    var KekuatanBusur = req.body.KekuatanBusur;
    var Email = req.params.Email;

    pengguna.editDataDiri(Nama, Password, Umur, TinggiBadan, JenisBusur, PanjangBusur, KekuatanBusur, Email, function(err,result){
        if(!err){
            console.log(result);
            res.send(result.affectedRows + ' record diubah');
        } else {
            console.log(err);
            res.status(500).send(err.code);
        }
    }); 
});

//routing edit data ketua atau pelatih
app.post('/api/editdataketuapelatih/:Email', urlencodedParser, jsonParser, function(req,res){
    var Nama = req.body.Nama;
    var Umur = req.body.Umur;
    var Email = req.params.Email;

    pengguna.editDataKetuaPelatih(Nama, Umur, Email, function(err,result){
        if(!err){
            console.log(result);
            res.send(result.affectedRows + ' record diubah');
        } else {
            console.log(err);
            res.status(500).send(err.code);
        }
    }); 
});

//routing hapus pengguna
app.delete('/api/pengguna/:Email', function (req, res){
    var Email = req.params.Email;

    pengguna.hapusPengguna(Email, function(err,result){
        if (!err){
            console.log(result);
            res.send(result.affectedRows + ' record dihapus');
        }
        else {
            console.log(err);
            res.status(500).send(err.code);
        }
    });
}); 



//routing get data jadwal
app.get('/api/jadwal/:email', function (req, res) {
    var email = req.params.email;
    jadwal.getJadwal(email, function(err, result){
        if (!err) {
            res.send(result);
        }
        else {
            console.log(err);
            res.status(500).send(err);
        }
    });
});


//routing tambah jadwal latihan
app.post('/api/jadwal', urlencodedParser, jsonParser, function (req,res){
    var Tanggal = req.body.Tanggal;
    var Waktu = req.body.Waktu;
    var Deskripsi = req.body.Deskripsi;
    var Email = req.body.Email;

    jadwal.tambahJadwalLatihan(Tanggal, Waktu, Deskripsi, Email, function(err, result){
        if(!err){
            console.log(result);
            res.send(result.affectedRows + ' record ditambahkan');
        }
        else {
            console.log(err);
            res.status(500).send(err.code);
        }
    })
})


//routing edit jadwal latihan
app.post('/api/jadwal/:ID_Jadwal', urlencodedParser, jsonParser, function(req,res){
    var Tanggal = req.body.Tanggal;
    var Waktu = req.body.Waktu;
    var Deskripsi = req.body.Deskripsi;
    var ID_Jadwal = req.params.ID_Jadwal;

    jadwal.editJadwalLatihan(Tanggal, Waktu, Deskripsi, ID_Jadwal, function(err,result){
        if(!err){
            console.log(result);
            res.send(result.affectedRows + ' record diubah');
        } else {
            console.log(err);
            res.status(500).send(err.code);
        }
    }); 
});


//routing hapus jadwal latihan
app.delete('/api/jadwal/:ID_Jadwal', function (req, res){
    var ID_Jadwal = req.params.ID_Jadwal;

    jadwal.hapusJadwalLatihan(ID_Jadwal, function(err,result){
        if (!err){
            console.log(result);
            res.send(result.affectedRows + ' record dihapus');
        }
        else {
            console.log(err);
            res.status(500).send(err.code);
        }
    });
}); 



//routing tambah jadwal ambil nilai
app.post('/api/j_ambilnilai', urlencodedParser, jsonParser, function (req,res){
    var Tanggal = req.body.Tanggal;
    var Waktu = req.body.Waktu;
    var Deskripsi = req.body.Deskripsi;

    jadwal.tambahJadwalAmbilNilai(Tanggal, Waktu, Deskripsi, function(err, result){
        if(!err){
            console.log(result);
            res.send(result.affectedRows + ' record ditambahkan');
        }
        else {
            console.log(err);
            res.status(500).send(err.code);
        }
    })
})


//routing edit jadwal ambil nilai
app.post('/api/j_ambilnilai/:ID_Jadwal', urlencodedParser, jsonParser, function(req,res){
    var Tanggal = req.body.Tanggal;
    var Waktu = req.body.Waktu;
    var Deskripsi = req.body.Deskripsi;
    var ID_Jadwal = req.params.ID_Jadwal;

    jadwal.editJadwalAmbilNilai(Tanggal, Waktu, Deskripsi, ID_Jadwal, function(err,result){
        if(!err){
            console.log(result);
            res.send(result.affectedRows + ' record diubah');
        } else {
            console.log(err);
            res.status(500).send(err.code);
        }
    }); 
});


//routing hapus jadwal ambil nilai
app.delete('/api/j_ambilnilai/:ID_Jadwal', function (req, res){
    var ID_Jadwal = req.params.ID_Jadwal;

    jadwal.hapusJadwalAmbilNilai(ID_Jadwal, function(err,result){
        if (!err){
            console.log(result);
            res.send(result.affectedRows + ' record dihapus');
        }
        else {
            console.log(err);
            res.status(500).send(err.code);
        }
    });
}); 



//routing get data nilai berdasarkan email
app.get('/api/nilaiku/:Email', function (req, res) {
    var Email = req.params.Email;
    nilai.getNilai(Email, function(err, result){
        if (!err) {
            res.send(result);
        }
        else {
            console.log(err);
            res.status(500).send(err);
        }
    });
});


//routing get data nilai
app.get('/api/datanilai', function (req, res) {
   //var Email = req.params.Email;
    nilai.getDataNilai(function(err, result){
        if (!err) {
            res.send(result);
        }
        else {
            console.log(err);
            res.status(500).send(err);
        }
    });
});


//routing tambah nilai
app.post('/api/nilai', urlencodedParser, jsonParser, function (req,res){
    var Tanggal = req.body.Tanggal;
    var TotalRambahan1 = req.body.TotalRambahan1;
    var TotalRambahan2 = req.body.TotalRambahan2;
    var TotalRambahan3 = req.body.TotalRambahan3;
    var TotalRambahan4 = req.body.TotalRambahan4;
    var TotalRambahan5 = req.body.TotalRambahan5;
    var TotalRambahan6 = req.body.TotalRambahan6;
    var EmailPengguna = req.body.EmailPengguna;

    nilai.tambahNilai(Tanggal, TotalRambahan1, TotalRambahan2, TotalRambahan3, TotalRambahan4, TotalRambahan5, TotalRambahan6, EmailPengguna, function(err, result){
        if(!err){
            console.log(result);
            res.send(result.affectedRows + ' record ditambahkan');
        }
        else {
            console.log(err);
            res.status(500).send(err.code);
        }
    })
})



app.get('/api/nilaiku/tanggal/:email', urlencodedParser, jsonParser, function(req,res){
    var email = req.params.email;
    nilai.getTanggal(email, function(err,result){
        if (!err) {
            res.send(result);
        }
        else {
            console.log(err);
            res.status(500).send(err);
        }
    });
});


//routing get data klub
app.get('/api/dataklub/:email', function (req, res) {
    var email = req.params.email;
    klub.getDataKlub(email, function(err, result){
        if (!err) {
            res.send(result);
        }
        else {
            console.log(err);
            res.status(500).send(err);
        }
    });
});



//routing tambah klub
app.post('/api/klub', urlencodedParser, jsonParser, function (req,res){
    var NamaKlub = req.body.NamaKlub;
    //var FirebaseUID = req.body.FirebaseUID;

    klub.tambahKlub(NamaKlub, function(err, result){
        if(!err){
            console.log(result);
            res.send(result.affectedRows + ' record ditambahkan');
        }
        else {
            console.log(err);
            res.status(500).send(err.code);
        }
    });
});


//routing edit data klub
app.post('/api/klub/:IDKlub', urlencodedParser, jsonParser, function(req,res){
    var NamaKlub = req.body.NamaKlub;
    var IDKlub = req.params.IDKlub;

    klub.editKlub(NamaKlub, IDKlub, function(err,result){
        if(!err){
            console.log(result);
            res.send(result.affectedRows + ' record diubah');
        } else {
            console.log(err);
            res.status(500).send(err.code);
        }
    }); 
});



//routing hapus klub
app.delete('/api/klub/:', function (req, res){
    var IDKlub = req.params.IDKlub;

    klub.hapusKlub(IDKlub, function(err,result){
        if (!err){
            console.log(result);
            res.send(result.affectedRows + ' record dihapus');
        }
        else {
            console.log(err);
            res.status(500).send(err.code);
        }
    });
}); 


module.exports = app