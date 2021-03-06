# To build and start app:

`npm ci && npm run ci && npm run build && npm run start`

The server/client will be accessable at http://localhost:8080

# To Run tests

- `npm test`
- `npm run test-watch-client`
- `npm run test-watch-server`

# Dev Environment

Run the npm installations

- `npm ci && npm run ci`

One script to put server and client in watch mode:

- `npm run watch`

To run the scripts in different consoles:

- server compile watch - `watch-server-build`
- server start in watch mode - `watch-server-start`
- client - `npm run watch-client`

# Directory set up

Client
src/api: functions for API interactions, and corresponding Typescript types
src/App.tsx: the main <App> component
src/index.tsx Renders app onto root id
src/components: components that are reused in multiple places
src/features:
src/features/contacts: components for displaying the contacts list

#

Full Stack Software Engineer Sample App

For the next step of the interview process we would like you to put together a simple web application. The application should be a single page application (SPA) that makes AJAX calls to HTTP endpoints in the backend of your app.

The application should be a simple contact directory app that lists contacts and allows the user to add a new contact.

## Requirements

You can use any Node libraries for the backend and any Javascript libraries and/or frameworks for the frontend. You can use any CSS libraries/frameworks as well.

Backend

- Should be written in Node JS
- Should be installable with either NPM or Yarn
- Should serve up an HTML page containing the frontend of your app
- Should have an endpoint to list contacts using a GET request
- Should have an endpoint to receive a POST request to create a new contact
- A contact should have a name (required), email (required) and an address (optional)
- Should have basic validation for any required fields
- Contacts should be stored in a text file on your server

Frontend

- Should list all contacts from your backend server
- Should display a form to create a new contact
- Form should have basic validation for any required fields
- Form should submit to your backend, create a new contact and add it to the displayed list of contacts
