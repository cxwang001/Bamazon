# Bamazon


An Amazon-like storefront with the MySQL and Node.js. The app will take in orders from customers and deplete stock from the store's inventory. 

The application will first display all of the items available for sale. Include the ids, names, and prices of products for sale. The app should then prompt users with two messages.

   * The first should ask them the ID of the product they would like to buy.
   * The second message should ask how many units of the product they would like to buy.

Once the customer has placed the order, the app should check if your store has enough of the product to meet the customer's request.

   * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

However, if store _does_ have enough of the product, the app should fulfill the customer's order.
   * This means updating the SQL database to reflect the remaining quantity.
   * Once the update goes through, show the customer the total cost of their purchase.

![image](https://user-images.githubusercontent.com/27830803/29238377-06226ae4-7ee9-11e7-9d0f-752002dc3c1d.png)
![image](https://user-images.githubusercontent.com/27830803/29238385-1eb82062-7ee9-11e7-9159-819ea924905e.png)

