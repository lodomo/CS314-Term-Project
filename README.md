# CS314 Term Project - ChatApp

## How to run the project locally
1. Clone the repository
```bash
git clone https://github.com/lodomo/CS314-Term-Project
```

2. Install the dependencies
```bash
npm install
```

3. Create your environment variables 
    a. In the "client" folder, create a .env file and add the following:
    ```bash
    VITE_GOOGLE_CLIENT_ID="YOUR GOOGLE CLIENT ID"
    VITE_API_URL="YOUR API BACKEND URL HERE"
    ```
    b. In the "api" folder, create a .env file and add the following:
    ```bash
    MONGO_URI="YOUR URI HERE"
    CLIENT_URL="YOUR CLIENT URL HERE"
    PORT="THE PORT YOU WANT TO RUN THE API ON"
    ```

4. Run the project in two different terminals.
    a. Run the client (front end)
    ```bash
    cd client
    yarn dev
    ```
    b. Run the api (back end)
    ```bash
    cd api
    npx nodemon index.js
    ```

5. Open the browser and go to http://localhost:3000

6. Chat away!
