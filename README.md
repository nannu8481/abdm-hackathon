# Affinidi UAF Client Lib [ Frontend Integration ]

This library allows you to seamlessly integrate the Affinidi Universal Loan Application in your client-side application.

## Installing the dependencies

In the root directory, run the `npm i` command to install all the client-related libraries.
To install the server related dependencies, go into the server folder and install using the `npm i` command.

## Set up the environment variables

Both the client-side app and server-side app needs environment variables to be setup.

### Client-side variables

```shell script
REACT_APP_AFF_CLOUD_GATEWAY = "https://cloud-wallet-api.{env}.affinity-project.org/api/v1/"
REACT_APP_BACKEND_URL = "http://localhost:3001/" // if PORT for backend is set to 3001
REACT_APP_API_KEY = "..." // Need to generate from Affinidi's Website
```

### Server-side variables

```shell script
HOST=localhost
PORT=3001
NODE_ENV=development
ENVIRONMENT=development
MONGODB_USER="..."
MONGODB_PASS="..."
MONGODB_HOST="..."
MONGODB_DATABASE="..."
CLOUD_WALLET_URL=https://cloud-wallet-api.staging.affinity-project.org/api/v1
CLOUD_WALLET_API_KEY="..." // Need to generate from Affinidi's Website
CLOUD_WALLET_ENV={env}
EUA_GATEWAY_URL=http://121.242.73.120:8083/api/v1
```

## Starting the service

After the environment variables are set, the application can be easily started. Inside of the `server` folder, run the command `npm run dev`. Once server is running and the MongoDB instance is connected, we can run the client-side using `npm start`.
