# M3 - README

#  FITLINE

# Quick Compo

## Description

Fitline was born to help people stay fit when they can't or don't want to go out of home. 

## User Stories

- **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
- **Signup:** As an anon I can sign up in the platform so that I can join the fit community.
- **Login:** As a user I can login to the platform so that I can see the exercise routines.
- **Logout:** As a user I can logout from the platform when I finish using it.
- **Add exercise:** As a user I can add exercises.
- **Edit Profile:** As a user I can edit his profile.
- **My exercises:** As a user I can see his created exercises.
- **Calendar:** As a user I can see the monthly calendar.
- **FAQ:** The FAQ page.
- **Exercises:** As a user I can see all exercises.

## Backlog

- Add a random exercise every month in the calendar
- Update the calendar every month with the month you touch
- Add edit video page.

# Client / Frontend

## React Router Routes (React App)

| Path                      | Component         | Permissions              | Behavior                                                     |
| ------------------------- | ----------------- | ------------------------ | ------------------------------------------------------------ |
| /                         | Home              | public <Route>           | Home Page                                                    |
| /signup                   | SignUp            | anon only <AnonRoute>    | Signup form, link to login, navigate to profile after signup |
| /login                    | Login             | anon only <AnonRoute>    | Login form, link to signup, navigate to profile after login  |
| /faq                      | Faq               | anon only <AnonRoute>    | FAQ Page                                                     |
| /faqP                     | FaqP              | user only <PrivateRoute> | FAQ page                                                     |
| /profile/:id              | Profile           | user only <PrivateRoute> | User Profile Page                                            |
| /profile/:id/add-video    | AddVideo          | user only <PrivateRoute> | Add exercise                                                 |
| /profile/:id/edit         | EditProfile       | user only <PrivateRoute> | Edit your profile                                            |
| /profile/:id/my-exercises | ExerciseCreated   | user only <PrivateRoute> | See your exercise created                                    |
| /videos                   | AllExercises      | user only <PrivateRoute> | See all exercises                                            |
| /calendar                 | Calendar          | user only <PrivateRoute> | See monthly calendar                                         |
| /videos/:id               | ExerciseDetails   | user only <PrivateRoute> | See the exercise details                                     |
| /videos/favourites/:id    | FavouriteExercise | user only <PrivateRoute> | See your favorites exercises                                 |



## Components

- Navbar
- Home
- SignUp
- LogIn
- Faq
- Profile
- AddVideo
- EditProfile
- ExerciseCreated
- AllExercises
- Calendar
- ExerciseDetails
- FavouriteExercise

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - addExercise(userId, title, description, url, intensity, muscle, duration)
  - editProfile(userId, username, weight, goal, imgPath)
  - userInfo(id)
  - exerciseInfo(id)
  - allVideos()
  - deleteVideo(id)
  - addFavourite(id)
  - deleteFavourite(id)
- Service
  - handleUplaoad()

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
  exerciseCreated: [{type: Schema.Types.ObjectId,ref:'Exercise'}],
  completed: tbc (date maybe),
  imgPath: String
}
```

Exercise model

```
 {
   title: {type: String, required: true},
   url: {type: String},
   intensity: {type: String},
   muscle : {type: String}
   description: {type: String},
   duration: number
 }
```



## API Endpoints (backend routes)



| HTTP Method | URL                       | Request Body                                       | Success status | Error Status | Description                                                  |
| ----------- | ------------------------- | -------------------------------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| POST        | `/signup`                 | {name, email, password}                            | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/login`                  | {username, password}                               | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/logout`                 | (empty)                                            | 204            | 400          | Logs out the user                                            |
| GET         | /                         |                                                    |                |              | Home Page                                                    |
| GET         | /profile/:id              |                                                    |                |              | See user profile                                             |
| PUT         | /profile/edit             | {username, email, weigth, goal, image}             | 201            | 400          | Edit Profile                                                 |
| POST        | /upload                   |                                                    | 200            | 404          | Add Photo                                                    |
| GET         | /profile/:id/my-exercises |                                                    |                |              | See Exercises created                                        |
| DELETE      | /my-exercises/:id         |                                                    | 200            | 404          | Delete exercise                                              |
| POST        | /profile/:id/add-video    | {url, title, description, muscle group, intensity} | 200            | 404          | Add video                                                    |
| GET         | /search                   |                                                    |                | 400          | Filters all videos on the database                           |
| GET         | /faq                      |                                                    |                |              | FAQ Page                                                     |
| GET         | /calendar                 |                                                    |                |              | Monthly calendar                                             |
| GET         | /videos                   |                                                    |                |              | See all exercises                                            |
| GET         | /videos/:id               |                                                    |                |              | See exercise details                                         |
| POST        | /videos/favourites/:id    | id                                                 | 200            | 404          | Add favourite exercise                                       |
| GET         | /videos/favourites/:id    |                                                    |                |              | See favourites exercises                                     |
| DELETE      | /videos/favourites/:id    | id                                                 | 200            | 404          | Delete favourite exercise                                    |





## Links

### Wireframe

![wireframes](https://raw.githubusercontent.com/Christian2497/fit-project-server/master/images/wireframe.png)

### Trello

[Link to your trello board](https://trello.com/b/sAh8PwX2/proyecto-fit) or picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/Christian2497/fit-project-client)

[Server repository Link](https://github.com/Christian2497/fit-project-server)

[Deployed App Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](https://docs.google.com/presentation/d/1WLpymaa1QK3PJTuNyf0hGJAPzENmW-8iZpt2tMTmszo/edit#slide=id.p)

