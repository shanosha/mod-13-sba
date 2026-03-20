# Product Inventory API
- API to manage its product inventory.
- RESTful API that can be the backbone of an online store, used by internal tools for inventory management and by the public-facing website to display products to customers.
- Built using Node.js, Express, and Mongoose.
- The API handles all fundamental CRUD operations and include advanced features like filtering, sorting, and pagination to manage a large and complex product catalog.

## Setup
- Clone the repository.
    ```
    git clone https://github.com/shanosha/mod-13-sba.git
    ```
- Navigate to the directory.
    ```
    cd mod-13-sba
    ```
- Install the node packages.
    ```
    npm install
    ```
- Setup your database connection credentials and port in a .env file in the root directory of the project.
    ```
    MONGO_URI = YOUR_DATABASE_CONNECTION_URL_HERE
    PORT = 3000
    ```  
- Run the Express server using nodemon.
    ```
    npm run dev
    ```
- Open the server URL in a browser.

## Testing the Database Connection on the Server
Use a tool like Postman or Thunder Client. Here the five core CRUD endpoints on this server:
- **Create:** POST /api/products - Creates a new product using the data in req.body.
- **Read All:** GET /api/products - Retrieves all products from the database.
- **Read One:** GET /api/products/:id - Retrieves a single product by its _id. This endpoint also supports the following optional query parameters:
  - category: Filter products by a specific category.
  - minPrice: Filter products with a price greater than or equal to this value.
  - maxPrice: Filter products with a price less than or equal to this value.
  - sortBy: Sort results. For example, price_asc for ascending price or price_desc for descending price.
  - page & limit: For pagination (defaulting to page 1, limit 10).
  - Example: ```/api/products/?category=Electronics&minPrice=200&maxPrice=500&sortBy=price_desc&page=1&limit=2```
- **Update:** PUT /api/products/:id - Updates a product by its _id using the data in req.body.
- **Delete:** DELETE /api/products/:id - Deletes a product by its _id.