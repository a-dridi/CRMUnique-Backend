# CRM Unique - Backend

Track your project status and send notifications about completed project stages or projects to your client. 
Your clients can check the status of a project by entering their email address and project id. 


The application needs Express JS, NodeJS and Mongo Database. All needed dependencies are saved in the package.json.

## Test cases
Test cases 100% success.
The test cases are in the path: /test/routes/

## Configuration

## Run
To start the application directly. You need to have NodeJS and MongoDB installed.

"server.js" production file is in the root of this repository. As well as other backend files that are needed for "NodeJS" server. The files in the folder "frontend" are needed for your "Angular" server.

**Start Database server (In Windows): **
`bin/mongod.exe`

**Start backend server:**
`npm run dev`


## API Routes

The id field of MongoDB is used to reference a table entry (e.g.: Communication Message). 

THESE ARE ALL THE API ROUTES:

### Communication Message

- Get all communication messages - GET request:
`GET /data/communicationMessage/all`

- Get a communication messages for a certain ID - GET request:
`GET /data/communicationMessage/get/byId/ID`

- Add a new communication message - POST request:
`POST /data/communicationMessage/add`
POST form should contain the following attributes:
String (id) communicationType, String message, String tag1, String tag2, String tag3, String tag4. String tag5. 

- Delete a certain communication messages by a ID - GET request:
`GET /data/communicationMessage/delete/byId/ID`


Check the folder "routes" for more API routes. 



## Installation (Deployment)

Copy all backend files into the folder "src". 

- Backend:
```
npm install
```
```
npm run build
```

Copy the content of the folder "build" to your server.
 

- Frontend:
```
npm install
```
```
ng build --prod=true
```

Copy the content of the folder "public" to your server.


## Authors

* **A. Dridi** - [a-dridi](https://github.com/a-dridi/)
* Check licences of dependencies


