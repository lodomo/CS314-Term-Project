# installs fnm (Fast Node Manager)
curl -fsSL https://fnm.vercel.app/install | bash

# download and install Node.js
fnm use --install-if-missing 20

# verifies the right Node.js version is in the environment
node -v 

# verifies the right NPM version is in the environment
npm -v 

sudo npm install --global yarn

cd client

yarn install
touch .env
echo "VITE_GOOGLE_CLIENT_ID=YOUR GOOGLE CLIENT ID
VITE_API_IP=YOUR API BACKEND URL HERE
VITE_API_URL=\"http://${VITE_API_IP}\"" > .env
 

cd ../api

yarn install
touch .env
echo "MONGO_URI=YOUR URI HERE
CLIENT_URL=YOUR CLIENT URL HERE
PORT=THE PORT YOU WANT TO RUN THE API ON" > .env
