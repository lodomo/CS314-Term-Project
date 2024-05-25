# Here lies the development journal to keep track of how everything is installed.
## There may be some stuff I missed because it was already installed in my system.

1) Installed Node.js
    - Downloaded the installer from the official website.
    - Version for this project is v21.7.1

2) Installed Yarn
    - Downloaded the installer from the official website.
    - Version for this project is 1.22.22

3) Installed Git
    - Downloaded the installer from the official website.
    - Version for this project is 2.34.1

4) Created a MondoDB Databa:se
    - URI needs to be added to the .env file

5) Created a GitHub Repository
    - Development done on seperate branches between myself and Josue

# Installation of Dependencies

1) Installed vite
    - yarn create vite
    - created 'client' for front-end

2) Installed node modules with yarn
    - cd client
    - yarn

3) Setup Tailwind
    - yarn add tailwindcss postcss autoprefixer
    - npx tailwindcss init -p

Then clear out all the CSS delete App.css as its redundant, setup tailwind in the index.css file.

4) Setup google authenticator.
    - Created a google authenticator project with the school email address
    - yarn add @react-oauth/google
    - Setup pages for signin button

5) Setup api
    - create api folder
    - yarn add express mongoose
    - yarn add nodemon --dev
    - yarn add dotenv

6) Send user info to the backend
    - yarn add axios react-router-dom
    - yarn add jose (for jwt token)
    - yarn add cors (for cross origin resource sharing)

7) sending user to the database
    - After the user signs in it sends the google data to the backend
    - That gets parsed into email, name, token, picture
    - yarn add mongoose
    - create mongoose schema for user

8) Fix changing URLS. Users should only see 1 url

9) Users go to a chat page now.

10) Setup websockets
    - yarn add ws

11) I didnt make notes... Users can send messages to a chatroom now.
    It's kinda broken it doesnt load right away and doesnt show the users name
    until you refresh the page.

12) Added a way to add chatrooms.
    Chat rooms are all independant

TODO add users to chatrooms. delete owned rooms.

