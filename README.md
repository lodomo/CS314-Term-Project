# MESSENGERN
# CS314 Term Project - Chat Application

## Structure and Implementation

### API

The API for our Instant Messaging Application is built using Node.js, Express.js, and MongoDB. It provides the necessary backend services for user authentication, chat room management, and message handling.

#### Key Components:
- **User Service**: Manages user registration, authentication, and profile management. Utilizes Google Identity Services for secure login.
- **Chat Service**: Handles the creation and management of chat rooms, allowing users to join and leave rooms as needed.
- **Message Service**: Manages the sending, receiving, and storage of messages within chat rooms, ensuring real-time delivery and persistent storage.

### Client

The client-side application is developed using React.js, providing a dynamic and responsive user interface.

#### Key Components:
- **User Interface (UI)**: A clean and intuitive interface optimized for various devices, ensuring a consistent experience across desktops, laptops, and mobile devices. Features include chat room creation, message exchange, and access to chat history.
- **Routing**: Utilizes React Router to handle navigation within the application, enabling smooth transitions between different chat rooms without page reloads.
- **State Management**: Manages user interactions and data updates efficiently, ensuring real-time communication and seamless user experience.
- **Authentication**: Integrates with Google Identity Services for secure user login and registration.
- **Message Handling**: Allows users to send and receive messages in real-time, with chat history accessible for review.

The combination of these technologies ensures that our Instant Messaging Application is robust, secure, and user-friendly, catering to a diverse range of communication needs.

## How to run the project locally
1. Clone the repository
```bash
git clone https://github.com/lodomo/CS314-Term-Project
```

2. Run the Install Script 
```bash
cd CS314-Term-Project
chmod a+x install.sh
./install.sh  
```

3. Create your environment variables 
    a. In the "client" folder, in the .env file and add the following:
    ```bash
    VITE_GOOGLE_CLIENT_ID="YOUR GOOGLE CLIENT ID"
    VITE_API_URL="YOUR API BACKEND URL HERE"
    VITE_PORT="THE PORT YOU WANT TO RUN THE CLIENT ON"
    ```
    b. In the "api" folder, in the .env file and add the following:
    ```bash
    MONGO_URI="YOUR URI HERE"
    CLIENT_URL="YOUR CLIENT URL HERE"
    PORT="THE PORT YOU WANT TO RUN THE API ON"
    ```

4. Run the project in two different terminals.
    a. Run the client (front end) from the root directory
    ```bash
    npm run client 
    ```
    b. Run the api (back end) from the root directory
    ```bash
    npm run api
    ```

5. Open the browser and go to http://localhost:*PORT*

6. Chat away!

## Testing

Testing was performed manually by following user stories and ensuring that the
application behaved as expected.

A secondary platform POSTMAN was used to quickly test API endpoints to ensure
that the backend was functioning as expected.

See test plan for more details.
