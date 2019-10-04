let mysql = require("mysql");
let inquirer = require("inquirer");
require("dotenv").config();
var chalk = require("chalk");


var connection = mysql.createConnection({
  host: "GreatBay.db.4473603.faf.hostedresource.net",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "GreatBay",

  // Your password
  password: process.env.DB_PASSWORD,
  database: "GreatBay"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  // these post and bid, both are hardcoded, this should change.
  inquirer
    .prompt([
      {
        type: "list",
        message: "are you bidding, or selling?",
        choices: ["post", "bid"],
        name: "menuChoice"
      }
    ]).then(function (res) {
      if (res.menuChoice === "post") {
        inquirer
          .prompt([
            {
              type: "input",
              message: "What'ya sellin?",
              name: "productName"
            },
            {
              type: "input",
              message: "Where'ya sellin?",
              name: "category"
            },
            {
              type: "input",
              message: "How much?",
              name: "price"
            }
          ]).then(function (data) {
            post(data.productName, data.category, data.price);
          })
      }
      else if (res.menuChoice === "bid") {
        connection.query("SELECT Product FROM AuctionItems", function(err, res) {
          if (err) throw err;
          // Log all results of the SELECT statement
          let listings = [];
          for (let thing of res){
            listings.push(thing.Product);
          }
          console.log(listings);
          connection.end();
        });
      }
    });



  // bid("Cocaine", 10);
  // post("Cocaine", "Drugs", "5");
});

function bid(item, bid) {
  //bidding stuff
  console.log("Posting your bid\n");
  var query = connection.query(
    "UPDATE AuctionItems SET ? WHERE ?",
    [
      {
        CurrentBid: bid,
      },
      {
        Product: item
      }
    ],
    function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " listing updated!\n");
    });
}

function post(item, category, price) {
  //posting stuff
  console.log("Posting your bid\n");
  var query = connection.query(
    "INSERT INTO AuctionItems SET ?",
    {
      Product: item,
      StartingBid: price,
      Category: category,
      CurrentBid: price,
      BuyItNow: price
    },
    function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " listing posted!\n");
    });
}








