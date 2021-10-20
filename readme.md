# Article REST API

## Tech stack

- express.js
- sequelize
- joi
- socket.io
- kafkajs
- postgreSQL

## Set project local env

### .env file

```
PORT=4000
BASE_ADDRESS=http://localhost
KAFKA_MAIN_BROKER=10.0.0.4:9092
FOLLOWERS_TOPIC=FOLLOWERS_TOPIC
POSTS_TOPIC=POSTS_TOPIC
COMMENTS_TOPIC=COMMENTS_TOPIC
KAFKA_MAIN_ID=posts-realtime-client
```

### Create db

```bash
    npx sequelize-cli db:migrate
```

### Seed mock data (this is optional)

```bash
    npx sequelize-cli db:seed
```

### Create the next topics at kafka

- FOLLOWERS_TOPIC
- POSTS_TOPIC
- COMMENTS_TOPIC

you can do this with the next command

```bash
    kafka-topics.sh --bootstrap-server bootstrapIp:bootstrapPort  --topic TOPIC-NAME --create --partitions 3 --replication-factor 1
```

Note: You can change the topics name, but you need to update the .env file

## NPM commands

 - npm start -> will start the dev server
 - npm test -> will run the  jest tests

## Goal of the project

### Main goal

Expose a rest API to manage

- Users
- Articles
- Comments
- Followers
- Favourite Articles
- Realtime notifications about
  - new articles
  - new follower
  - new comment

### Why did I build this project

I wanted to improve my backend skills building a project that I will consume in the future with React; the topics I wanted to learn are

- Message brokers
- Realtime services
- Sequelize ORM
- Database versioning

## Todos

- Improve the architecture
- Add the auth0 middleware for authentication
- Add all the missing tests
- With Socket.IO send messages to specific users
