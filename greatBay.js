let mysql = require("mysql");
let inquirer = require("inquirer");

//inquirer stuff
//
//
//
//
//
//

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "",
    database: ""
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    //do stuff
  });

  function bid(){
      //bidding stuff
  }

  function post(){
      //posting stuff
  }







