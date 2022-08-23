# nodejs-st-22-rest-api


## Installation
```
- git clone https://github.com/anna-left/nodejs-st-22-rest-api.git

- git checkout [branch name]
- npm install
- rename .env.example file to .env
- enter your database information into file .env

set variable value  .env.LOG_REQUEST_RESPONSE=false
if you don't want to log request and response

- create tables in your database using script migrate
- fillit in with predefined values collection using script seed
```

## Running the app

Development
```
$ npm run start:dev
```

Production
```
$ npm run start
```
## Queries

- create user
- update user
- delete user
- get auto-suggest list (or all users) 
- get user by id
- create group
- update group
- delete group
- get all groups 
- get group by id

You can use Postman collection for sending requests
```
CRUD.postman_collection.json
```

You can use index.html for testing CORS
```
src\test-cors\index.html
```
## Author

👤 **Anna Rybakova**

- discord: `anna-left#0672`
- telegram: https://t.me/AnnaFavor

If you have any questions please contact me
