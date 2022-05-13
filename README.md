# ShopifyBackendChallenge

# Data
Has a Database Class which simulates a db ( like Mongo)

we store all the data in the data class which is initialized with some random data

# C - can create an order
- can create an order by filling out all the fields
- fields get validated in the backend
- the price field has to be a valid price
- the quantity has to be a positive integer
# R - can get all orders
- all the orders are called from the backend
- api has functionality to get an item by id aswell but not used in frontend
# U - can update an order:
- when you select the update button the items info gets filled in the field and then you can edit
- click cancel to cancel editing
- click update to update the item
# D - can delete an order
- deletes an order by id 
- can add a deletion comment
- recently deleted is only located in the frontend, with the deletion comment
- you can restore the recently deleted items by clicking restore item


# Running the app
-[npm i] to download the necessary packages
-[npm run start] in root directory to start the backend
-[npm start] in client directory to start frontend react app