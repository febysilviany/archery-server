//import mysql
var mysql = require('mysql');

//connection ke mysql
var dbconnect = mysql.createPool({
    host:"localhost", //set host
    user:"root", //set user
    password:"", //set password
    database:"archeryclubscore" //set nama database
});
module.exports = dbconnect //export dbconnect


