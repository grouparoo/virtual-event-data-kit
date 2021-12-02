# Virtual Event Data Kit

This project is meant to be deployed to Heroku and serve as the Redis storage for a conference website made from the [virtual-event-starter-kit](https://github.com/vercel/virtual-event-starter-kit).

Users sign up for the conference and they are stored in the Redis database.

This repo is a template for the following:

- (optionally) Setting up that Redis database and hosting on Heroku
- Reading out of Redis and writing into a Postgres database for easy querying
- Syncing sign ups to Mailchimp or, using [Grouparoo](https://www.grouparoo.com), any other marketing automation provider.

### Setup

`cp .env.example .env` and fill out the variables.

`npm install`

### Run

`npm start`

### Deploy to Heroku

- Provision a server with these add-ons
  - Heroku Postgres (sets DATABASE_URL)
  - Heroku Redis (sets REDIS_URL)
  - Heroku Scheduler

Use the Redis details for your virtual-event-starter-kit, so it will write there.
Then set all the environment variables in `.env.example` that are not set by Heroku itself.

This environment variable should be set if you use more than the Postgres Hobby plan.

- `DATABASE_SSL_SELF_SIGNED=true`

When deployed to Heroku, [Grouparoo](https://www.grouparoo.com) will be running on the website. Set up your team after the first deploy.

To populate Postgres from Redis automatically, set a Job in Heroku Scheduler to run `./redis_to_postgres` every 10 minutes.
