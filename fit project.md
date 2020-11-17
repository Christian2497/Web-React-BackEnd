# M3 - README

 

# Quick Compo

## Description

(app name) was born to help people stay fit when they can't or don't want to go out of home.

## 

## User Stories

- **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
- **Signup:** As an anon I can sign up in the platform so that I can join the fit community.
- **Login:** As a user I can login to the platform so that I can see the exercise routines.
- **Logout:** As a user I can logout from the platform when I finish using it.

## Backlog

- TBD

# Client / Frontend

## React Router Routes (React App)

| Path | Component | Permissions | Behavior |
| ---- | --------- | ----------- | -------- |
|      |           |             |          |
|      |           |             |          |
|      |           |             |          |
|      |           |             |          |
|      |           |             |          |
|      |           |             |          |
|      |           |             |          |
|      |           |             |          |
|      |           |             |          |



## Components

- Navbar

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()

# Server / Backend

## Models

User model

```
{
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  weight: number,
  goal: number,
  favorites: [{type: Schema.Types.ObjectId,ref:'Exercise'}],
  completed: tbc (date maybe),
}
```

Exercise model

```
 {
   title: {type: String, required: true},
   url: {type: String},
   intensity: {type: String},
   muscle-group : {type: String}
   description: {type: String}
 }
```



## API Endpoints (backend routes)



| HTTP Method | URL            | Request Body            | Success status | Error Status | Description                                                  |
| ----------- | -------------- | ----------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| POST        | `/auth/signup` | {name, email, password} | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`  | {username, password}    | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/auth/logout` | (empty)                 | 204            | 400          | Logs out the user                                            |
|             |                |                         |                |              |                                                              |
|             |                |                         |                |              |                                                              |
|             |                |                         |                |              |                                                              |
|             |                |                         |                |              |                                                              |
|             |                |                         |                |              |                                                              |
|             |                |                         |                |              |                                                              |





## Links

### Trello

[Link to your trello board](https://trello.com/b/sAh8PwX2/proyecto-fit) or picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/screeeen/project-client)

[Server repository Link](https://github.com/screeeen/project-server)

[Deployed App Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](https://docs.google.com/presentation/d/1WLpymaa1QK3PJTuNyf0hGJAPzENmW-8iZpt2tMTmszo/edit#slide=id.p)

