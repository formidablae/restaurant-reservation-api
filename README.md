# Restaurant (Table) Reservation API

A simple API for reserving tables at a restaurant.
The API is based on the [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) architectural style and uses [Node.js](https://nodejs.org/), [TypeScript](https://www.typescriptlang.org/), [Express](https://expressjs.com/), [TypeORM](https://typeorm.io/) and stores the data in [MySQL](https://www.mysql.com/) database. All is running in [Docker](https://www.docker.com/) containers.

## Requirements
#### Tech stack & best practice requirements:
* [x] Use Node.js, TypeScript.
* [x] Store data in a MySQL database.
* [x] Run everything on Docker containers.
* [ ] Pay attention to:
  * [ ] error handling,
  * [ ] type safety,
  * [ ] dependency management.
* **Nice to have**:
  * [ ] Use functional programming paradigms.
  * [ ] OpenAPI documentation.
  * [ ] Use TDD (test driven development) paradigms.
  * [ ] Deploy the API to Heroku or Vercel.

#### Feature requirements:
* [ ] There should be a `User` entity. Users should have `name` and `email` fields. A user should be unique by email.
  * [x] Create a `Users` table in database.
  * [x] Create a `User` model.
  * [ ] Generate some fake users.
  * [x] It should be possibile to create a new user.
* [ ] There should be a `Restaurant` entity. For simplicity a restaurant should have only 5 tables, each with 4 seats. Seating time is 1 hour and a restaurant is open every day from 19:00 to 00:00.
  * [x] Create a `Restaurants` table in database.
  * [x] Create a `Restaurant` model.
  * [ ] Generate some fake restaurants.
  * [ ] It should be possibile to create a new restaurant.
  * **Nice to have**:
    * [ ] It should be possible to get the list of all restaurants.
    * [ ] It should be possible to get the list of all restaurants not fully booked in a specific date.
    * [ ] It should be possible to get the list of all restaurants that have at least 1 free table in a certain date and hour.
  * **In the future**:
    * [ ] Introduce `superadmin`, `restaurant_owner` and `generic_user` roles.
    * [ ] Restaurants should be associated to a user with `restaurant_owner` privileges.
    * [ ] Users with `restaurant_owner` privileges should be able to create, update and delete their own restaurants.
    * [ ] Users with `superadmin` privileges should be able to create, update and delete users.
    * [ ] Users with `superadmin` privileges should be able to update and delete restaurants and reservations.
* [ ] There should be a `Reservation` entity. Overbooking should not be allowed.
  * [ ] Create a `Reservations` table in database.
  * [ ] Create a `Reservation` model.
  * [ ] Generate some fake reservation.
  * [ ] It should be possibile to make a reservation (book a restaurant) in a specific date and time.
  * [ ] It should be possibile to get all reservations given a specific date range.
  * [ ] The results of the reservation list should be paginated.
  * **Nice to have**:
    * [ ] It should be possibile to get all reservations given a restaurant.
    * [ ] It should be possibile to get all reservations given a user.
    * [ ] It should be possibile to get all reservations given a specific date range and a restaurant.
    * [ ] It should be possibile to get all reservations given a specific date range and a user.
    * [ ] It should be possibile to get all reservations given a specific restaurant and a user.
    * [ ] It should be possibile to get all reservations given a specific date, restaurant and user.

## Instructions on how to run the project
Clone the project

$ `git clone git@github.com:formidablae/restaurant-reservation-api.git`

Change directory to inside the project

$ `cd restaurant-reservation-api`

Copy environment variables from `.env.example` to `.env`

$ `cp .env.example .env`

Fire up the containers with the database and the API.

To run with Docker see the alternative instructions in the end.

$ `docker-compose up -d`

Run the migrations

$ `docker exec -it restaurant_reservations_app /bin/bash -c "node --require ts-node/register ./node_modules/typeorm/cli.js migration:run"`

Sync the database

$ `docker exec -it restaurant_reservations_app /bin/bash -c "node --require ts-node/register ./node_modules/typeorm/cli.js schema:sync && npm run db:migrate"`


If anything isn't working as expected:

$ `docker-compose down -v`

$ `docker container prune`

$ `docker volume prune`

$ `docker image ls`  # ids of the images to remove

$ `docker image rm <IMAGE ID 1> <IMAGE ID 2>`  # get the ids from previous command

$ `docker-compose up --build -d`

... continue with the rest of the instructions from above.

### Alternatively, you can run the following commands in a terminal to build and run without Docker

Install the packages

$ `npm install`

Create the database

$ `npm run db:create`

Do the migrations

$ `npm run db:migrate`

<!--
Seed the database with dummy data

 $ `npm run db:seed`
 -->

Sync the database

$ `npm run db:sync`

Run the project

$ `npm run build`

$ `npm run start`

or

$ `npm run dev`

or

$ `npm run debug`
