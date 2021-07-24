# Virtual Event Data Kit

This project is meant to be deployed to Heroku and serve as the Redis storage for a conference website made from the [virtual-event-starter-kit](https://github.com/vercel/virtual-event-starter-kit).

Users sign up for the conference and they are stored in the Redis database.

There are additional tools on top of that

## Tools

## Development

### Setup

`cp .env.example .env` and fill out the variables.
`npm install`

### Run

`npm start`

### Deploy Redis to Postgres

- Provision a server with these add-ons
  - Heroku Postgres (sets DATABASE_URL)
  - Heroku Redis (sets REDIS_URL)
  - Heroku Scheduler

Then you can deploy to that server.

Use the Redis details for your virtual-event-starter-kit.

### Deploy Grouparoo

Set these environment variables:

- WEB_URL=https://www.yourwebsite.com
- SERVER_TOKEN=my-super-cool-server-token (but changed)
- DATABASE_SSL_SELF_SIGNED=false (or true if on upgraded Heroku database)
- GROUPAROO_LOGS_STDOUT_DISABLE_TIMESTAMP=true (Heroku adds timestamps to all log messages)
- GROUPAROO_LOGS_STDOUT_DISABLE_COLOR=true
