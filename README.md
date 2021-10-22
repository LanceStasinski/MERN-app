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
