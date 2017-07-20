var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');
require('console.table');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",

  password: "Sunset066532",
  database: "bamazon"
});

// connection.connect(function(err){
//   if(err) throw err;
//   printTable();
//   //  
// });
//Print overall table
function printTable(){
	connection.connect(function(err) {
  		// if (err) throw err;
  		// console.log("connected as id " + connection.threadId);
  		connection.query("SELECT * FROM products", function(err, res) {
    	if (err) throw err;
         	console.table(res);
          askQuestion();
  		});
  		// connection.end();
		
	});

};
printTable();
// function sequence() {
//  askQuestion(function() {
//   printTable();
//  })
// };

// printTable();

// askQuestion();


function askQuestion() {

   
  // prompt for info about the item being put up for auction
  	inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "What is the ID of the product you would like to buy",
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
     ])
      .then(function(answer) {
        // var uQuan = answer.user_quantity;
        // var uItem = answer.item;
      
        connection.query("SELECT * FROM products WHERE ?", 
            [{
              item_id: answer.item
            }], 
            function(err, res){
              if (err) throw err;
              console.table(res);
                var current_quality = res[0].stock_quantity;
                console.log(current_quality);
                var price = res[0].price;
                var left_quality = current_quality - answer.user_quantity
                // if (current_quality > answer.user_quantity) {
                 
                  
                  console.log("Ammount left: " + left_quality);
                  console.log("Cost of purchase = " +(answer.user_quantity * price));
                  //then we update DB
                  connection.query("UPDATE products SET stock_quantity=? WHERE item_id=?", 
                    [
                    left_quality, answer.item
                    ], 
                    function(err, res) {
                    console.table(res);
                    
                  });
              
          // else

// };


              connection.end();
            });

        });
      // printTable();
};  


