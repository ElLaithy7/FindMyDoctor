# FindMyDoctor

A MERN stack app to connect patients and doctors.

# Dependencies

- Dependencies for the server are declared in server/package.json
- Dependencies for the client are declared in client/package.json

# To run the app

- Install NodeJs from this link https://nodejs.org/en/
- Make .env files for the client and the server (examples are shown below)
- In the directory of the server, run `npm install` then `node index.js`
- In the directory of the client, run `npm install` then `npm start`

# To run using Docker

- To start the server, execute `docker run -it -p 3000:3000 laithy/api`
- To start the client, execute `docker run -it -p 3001:3001 laithy/web`

# To run using Docker Compose

- Execute `docker-compose up --build`

# Config

- There are 2 .env files, one for the server and one for the client, examples for them are provided in the directory of the server and the directory of the client, and also below.

# Client .env

REACT_APP_GOOGLE_MAPS_API_KEY = API key for google maps api
PORT = port for client

# Server .env

MONGO_URI = connection string for MongoDB
SECRET_OR_KEY = secret key to be used by passport for authentication
