### How I think to implement the project

1. Structure the project with folders for routes, controllers, models, and middleware.
2. Set up the server using Express.js and connect to MongoDB using Mongoose.
   2.1. Create a `.env` file to store environment variables like `PORT`, `MONGO_URL`, and `JWT_SECRET_KEY`.
   2.2. fill index.js with the necessary code to start the server and connect to the database.

### Then each feature will be implemented as follows:

1. Create Model
   1.1 Draw links between the models to ensure proper relationships are established.
   1.2 Define the schema for each model in the models folder, including fields, data types, and validation rules.
2. Thinking about the routes: Define the endpoints for each feature in the routes folder.
3. Create Controller: Implement the logic for each endpoint in the controllers folder.
   3.1 After implementing at leat 2 endpoints for one feature, I will apply the concept of DRY (Don't Repeat Yourself) to avoid code duplication and make the code more maintainable.
   3.2 I will use middleware and wrappers to handle common tasks like error handling

### Then I will test the endpoints using Postman to ensure they work as expected.

> After Testing passed , I will follow these steps:

1.  Start protecting the routes using JWT authentication and authorization : to ensure that only authenticated users can access certain endpoints.
2.  Ensure security best practices are followed, such as input validation, output encoding, and secure password storage.

---

### To implement endpoints :

**Order of implementation (dependency-safe):**

1. **Category** → no deps
2. **Tax** → no deps
3. **User** → no deps
4. **Product** → depends on Category
5. **Cart** → depends on User + Product
6. **Order** → depends on User + Product + Tax => I will implement it later

