const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  PUBLIC_FOLDER_PATH: "/public",
  PROFILE_PICTURES_PATH: "/public/assets/profiles",
  PICTURE_MAX_SIZE: 2 * 1024 * 1024,
  PORT: process.env.PORT,
  ADDRESS: process.env.BASE_ADDRESS,
  TOPIC_POSTS: process.env.POSTS_TOPIC,
  TOPIC_FOLLOWERS: process.env.FOLLOWERS_TOPIC,
  TOPIC_COMMENTS: process.env.COMMENTS_TOPIC,
  KAFKA_MAIN_BROKER: process.env.KAFKA_MAIN_BROKER,
  KAFKA_MAIN_ID: process.env.KAFKA_MAIN_ID
};
