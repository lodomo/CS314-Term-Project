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

4) Created a MondoDB Database
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
    - 