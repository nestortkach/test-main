# Test Task

## 1. Backend

To run the backend, you will need Docker and Node.js version 18 or higher.

1. After cloning the repository, navigate to the backend directory and install all dependencies using the command:
   ```
   npm i
   ```

2. Then, use the following command to create the database and start the MySQL Docker container (make sure Docker is running on your computer):

    ```
    npm run create-db
    ```

3. After that, execute the following command to migrate the database:
    ```
    npm run migrate
    ```
4. Create .env file in root directory and paste this
    ```JWT_SECRET=aqwjrlkqjkjklmklqwjrpj2po1j23kmlknmqlkwmklnqklwelkqmjwe```    
4. Finally, start the server using the command
    ```
    npm run start:dev
    ```
If all the previous steps were completed correctly, there should be no errors in the console.

## Frontend

1. Navigate to the frontend folder and install all dependencies with the following command
    ```
    npm i
    ```
2. Start the frontend with the command:
    ```
    npm run start
    ```
3. Open the site at
    ```http://localhost:3000```

## Notes
Everything was implemented according to the task requirements. In some places, decisions were made based on best practices, such as:
- Naming endpoints according to REST conventions
- Generating and setting a JWT token in the Authorization header during login/registration
- Retrieving the user according to the JWT token and storing it in LocalStorage

The project has a minimalist design, focusing more on logic rather than appearance