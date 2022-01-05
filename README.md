# NodeJSTask

## Default admin user credentials:
Note or change the following values at "services/server/.env"
ADMIN_PASSWORD="adminSecretPassword"
ADMIN_EMAIL="admin@email.com"
To log in with a default admin account after installation.

## Installation

Install [Docker Compose](https://docs.docker.com/compose/install/), then:

```
$ docker-compose up -d
```

Open application in the browser at http://localhost:3000

## Tests
Install dependencies:
```
$ npm install
```
```
$ cd services/lib
$ npm install
```

```
$ cd services/server
$ npm install
```
Run the test script from the root folder:
```
$ npm test
```
