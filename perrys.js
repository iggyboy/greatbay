
require("dotenv").config();
var mysql = require("mysql");
var chalk = require("chalk");
// Create our connection

var divider = "\n\n--------------------\n\n"
var connection = mysql.createConnection({
    host: "GreatBay.db.4473603.faf.hostedresource.net",
    port: 3306,
    user: "GreatBay",
    password: process.env.DB_PASSWORD,
    database: "AuctionItems"
});

var userGenre = process.argv.slice(2).join(" ");

connection.connect(function(err){
    if(err) throw err;
    console.log("connected as id " + connection.threadId);

    queryAllSongs(function(){
      queryGenreSongs(userGenre, function(){

            connection.end();
        });
    })
})