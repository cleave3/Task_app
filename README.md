# Task_app

### SETUP GUIDE

* DB
    The application uses MongoDB with a docker container

- Add a .env file with the follow content
```
APP_SECRET=
DATABASE_URL=
TEST_DB=
```
- Start docker mongoDB container in your pc

```
docker run --name mongodb -d -p 27017:27017 mongo
```

see <a href="https://www.mongodb.com/compatibility/docker">here</a> to help with setting up mongoDB with docker

* Install Dependencies

```
npm install
```

* Start in Dev Mode

```
npm run dev
```

* Start in Production Mode

```
npm run start
```


* Run Test

```
npm run test
```

### FEATURES
- <b>Authentication:</b> All Task endpoints requires Authentication
    
    Set ```x-access-token: {{ACCESS_TOKEN}}``` in the header

```
{
  "status": boolean
  "code": number
  "message": string
  "data": null | interface{} | any[] 
}
```
### MODULE
The Application has the following modules
- User
- Task

### ENDPOINTS
check endpoints <a href="https://documenter.getpostman.com/view/6495351/Uyxkmm7x" target="_blank">https://documenter.getpostman.com/view/6495351/Uyxkmm7x</a>