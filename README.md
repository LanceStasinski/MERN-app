# MERN-app

This repository contains practice code for creating a full stack (MERN) application. The application is a place sharing application where users can create a list of places, each with a picture, Google Maps box, and description.

## The Frontend - React

The frontend was built using React with typescript and CSS modules for styling. React Router was used to add separate 'pages' in this SPA, CSSTransitions were used for style transitions, and a variety of hooks were used to set authentication status, manage forms, and show places for each user. These hooks include:

* useState() - manage component state
* useReducer() - manage the state of multiple related parts of a component
* useContext() - manage application-wide state
* useCallback() - prevent a function from being recreated each time a component renders
* useEffect() - manage effects after a component renders
* useParams() - hook from React Router DOM that retrieves values from route params

## The Backend

### NodeJS

The backend is a REST api that has separate routes and controllers for places and users. These routes allow a user to signup, login, find a list of all users, create a place, retrieve all places for single user, update a place, and delete a place. The server is built using the Express framework. Validation was added using the `express-validator` package. Coordinates are generated for each place using the Geocoding API from Google.

### MongoDB

The database is a MongoDB Atlas database. The `mongoose` package is used to connect to the database and perform CRUD (Create, Read, Update, Delete) operations. Schemas are set up for Places and Users, and relations are setup between the two schemas. Sessions are used to modify related items, such as placeIds stored within a single user.

## Deployment

The React app is deployed on [Firebase](https://mern-user-places-client.web.app/) and the server is deployed on [Heroku](https://mern-app-user-places.herokuapp.com/). NOTE: the server is running on Heroku's free tier so uploaded images are not persistantly stored.

## Challenges

I followed the instructors logic, but I implemented the Typescript and CSS modules on my own. Implimenting TypeScript was especially challenging due to type errors that occurred between components; however, this was a great way to learn how to be more explicit about the types I was using and expected. Some compilation errors occured during the build process and they ultimately made me more familiar with the tsconfig.json file. The CSS modules were occassionally difficult to manage when the CSS properties of one component were forwarded to another through props, but this was a good oportunity to practice CSS specificity.
