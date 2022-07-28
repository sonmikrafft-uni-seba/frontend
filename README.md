# Getting Started with Budgetly Frontend

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
Please find the corresponding Backend [here](https://gitlab.lrz.de/seba-master-2022/team-03/backend).

## Installation

In the project directory, you need to run

### `yarn install`

to install all packages needed for our frontend application.
If you don't have yarn installed check [those instructions](https://classic.yarnpkg.com/lang/en/docs/install/).

To start the frontend application you need to run

### `yarn start`

which will start a development webserver and should also open your default browser with the web application.
If this is not the case, check the terminal for the corresponding uri. Typically the application should run at http://localhost:3000

## Configuration

In `src/constants.js` you can change:

- the `baseUrl` of the web application.
- the `Backend` uri as well as any Backend Endpoint like `USER_ENDPOINT_API`.
