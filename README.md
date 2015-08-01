# Class-Companion

-add description here

## Team

  - __Product Owner__: JD Davis
  - __Scrum Master__: Eric Kao
  - __Full Stack Engineer__: Stacy Huang
  - __Full Stack Engineer__: David Hom

## Table of Contents

1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Server Environment Setup](#server-environment-setup)
    1. [Client Environment Setup](#client-environment-setup)
    1. [Tasks](#tasks)
1. [Team](#team)



## Development

### Installing Dependencies

```
npm install
```

NPM should install bower dependencies automatically.


### Server Environment Setup

#### Description
Follow these instructions to get Postgres up and running for the development and testing environments.

EDIT FROM HERE


## Initial Setup

- Clone the repo
- cd impromptu-sunset
- npm install
- grunt setup —user ```YOUR_MAC_USERNAME```
- grunt nodemon


- be sure to change ```YOUR_MAC_USERNAME``` to your actual Mac username
 
### Client Environment Setup

#### Description
Follow these instructions if you want Karma to re-run the tests automatically on a file change.

#### Install the Karma Command Line Tool

```npm install -g karma-cli```

#### Start Karma

```karma start```

### Run Tests

To run the tests after installing, simply type ```grunt test``` into the command line from the root directly.

### Updating Database migrations

Check sequelize-cli for information on how to create migrations. 

### Deploying to Heroku

- grunt deploy --prod  (push to heroku)

- grunt heroku-setup  (runs migrations on heroku)

## Code Documentation

[Documented Client Code here](docs/client/index.html)
[Documented Server Code here](docs/server/index.html)

