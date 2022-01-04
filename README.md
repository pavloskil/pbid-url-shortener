# PBID URL Shortener

A simple web application that shortens URLs.

## Requirements (Install them before you run)

* Linux / Unix operating system (this application has not been tested on MS Windows OS)
* Node 14.x or newer
* Docker CE/EE 19.03.0 or newer (20.10 recommended)
* Docker Compose 1.27.0 or newer

## Running the application

From the project directory, start up the application by running:\
`docker-compose up`

## Usage

Open your browser and navigate to:\
`http://localhost:3000`\
Type or paste in any URL, click the `SHORTEN` button and get the shortened version of the URL.\
Supported protocols are http and https.

## Notes

* For simplicity, MongoDB connection uses the default settings for port and no username/password.
* Duplicate entries (for full URLs) are allowed, as it wasn't clear enough in the specs which is the desired behaviour.
* The application has been tested on MacOS 11 and Docker Desktop for Mac v.4.3.2 using `http://localhost:3000`.

## Available script for local development / testing

Note that in order to use the app locally, you need to start the `pbid-mongodb` image manually\
by running from project folder: `docker-compose up -d pbid-mongodb`.

### Client

Start in dev mode:\
 `npm start`

 Watch mode (development environment only):\
 `npm run watch`

 Run tests:\
 `npm test`

### Server

Start in dev mode:\
 `npm start`

 Watch mode (development environment only):\
 `npm run watch`

 Run tests:\
 `npm test`

 Run tests in watch mode:\
 `npm run test:watch`
