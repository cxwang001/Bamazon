
var mysql = require("mysql");
var inquirer = require("inquirer");
require('console.table');
//making mysql DB connection
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",

  password: "Sunset066532",
  database: "bamazon"
});

console.log("\nWe have the following products in stock. Please make purchase!")
//Print overall table
function printTable(){
	connection.connect(function(err) {
  		connection.query("SELECT * FROM products", function(err, res) {
    	if (err) throw err;
         	console.table(res); //Print out table using console.table
          askQuestion(); //call the next function
  		});
	});
};
printTable(); //call inital products table functtion

function askQuestion() {
// prompt for info about the item being put up for purchase
  	inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "What is the ID of the product you would like to buy?",
        validate: function(value) {
          if (isNaN(value) === false && value < 11){
            return true;
          }
          return false;
        }
      },
      {
        name: "user_quantity",
        type: "input",
        message: "How many would you like?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
     ]).then(function(answer) { //Query out the product is being purchased
          connection.query("SELECT * FROM products WHERE ?", 
            [{
              item_id: answer.item
            }], 
            function(err, res){
              if (err) throw err;
                // console.table(res);
                var current_quality = res[0].stock_quantity;
                console.log("\nWe have " + current_quality + " units in stock right now.");
                var price = res[0].price;
                var left_quality = current_quality - answer.user_quantity
                if (current_quality > answer.user_quantity) {
                    console.log("\nTotay Cost of this purchase will be $ " +(answer.user_quantity * price));
                    //then update DB the quatity where the product ID has been selected
                    connection.query("UPDATE products SET stock_quantity=? WHERE item_id=?", 
                    [left_quality, answer.item], 
                    function(err, res) {
                      if (err) throw err;
                    });
                  //Showing the updated table
                    connection.query("SELECT * FROM products", function (err, res) {
                    console.table(res)
                    });
              
                } else{ //if not enough in stock, no purchase!!
                  console.log("Sorry, we don't have enough quatity in stock!")
                };
              connection.end();
            });

      });
};  //end of askQuestion function


