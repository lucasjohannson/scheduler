# Interview Scheduler

Interview Scheduler is a single page application (SPA), built using React.
It uses persistent data by the API server using a PostgreSQL database.
The client application communicates with an API server over HTTP, using the JSON format.
Jest tests are used through the development of the project.

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Screen Shots

!["Typical home screen"](https://github.com/lucasjohannson/scheduler/blob/master/docs/appointment-home.png?raw=true)
!["Loading Screen when performing async action"](https://github.com/lucasjohannson/scheduler/blob/master/docs/appointment-async.png?raw=true)
!["Verification before user performs destructive action "](https://github.com/lucasjohannson/scheduler/blob/master/docs/appointment-confirm.png?raw=true)
!["Displayes error message when an action coule not be performed"](https://github.com/lucasjohannson/scheduler/blob/master/docs/appointment-error.png?raw=true)
!["User input error handling"](https://github.com/lucasjohannson/scheduler/blob/master/docs/appointment-errorHandle.png?raw=true)




## Functionality 

*Interviews can be booked between Monday and Friday.
*A user can switch between weekdays.
*A user can book an interview in an empty appointment slot.
*Interviews are booked by typing in a student name and clicking on an interviewer from a list of available *interviewers.
*A user can cancel an existing interview.
*A user can edit the details of an existing interview.
*The list of days informs the user how many slots are available for each day.
*The expected day updates the number of spots available when an interview is booked or canceled.
*A user is presented with a confirmation when they attempt to cancel an interview.
*A user is shown an error if an interview cannot be saved or deleted.
*A user is shown a status indicator while asynchronous operations are in progress.
*When the user presses the close button of the error they are returned to the Form or Show view (skipping Status and Confirm).
*The application makes API requests to load and persist data. We do not lose data after a browser refresh.

## Remarks 

This was one of the most challenging projects I have worked on became familiar with a whole new framwork with React and developed a keen skill for testing with the use of cypress for E2E testing, Story book for creating components in isolation and Jest for typical unit testing. 