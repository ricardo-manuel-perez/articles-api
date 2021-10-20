const express = require("express");
const {
  addFollower,
  readFollowers,
  readFollowedUsers,
} = require("../controllers/Follow");
const { FollowSchema } = require("../schemas/Follow_Schema");
const joiMiddleware = require("../middleware/joi_middleware");
const router = express.Router();

router.post("/user/follower", joiMiddleware(FollowSchema, "body"), addFollower);
router.get("/user/followers/:email", readFollowers);
router.get("/user/followed/:email", readFollowedUsers);
module.exports = router;
