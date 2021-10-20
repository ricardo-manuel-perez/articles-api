const User = require("../../models").User;
const userService = require("../services/user.service");
const { QueryTypes } = require("sequelize");
const db = require("../../models");
const addFollower = async (req, res) => {
  try {
    const followedEmail = req.body.followedEmail;
    const email = req.body.followerEmail;
    const user = await userService.getUserByPK(followedEmail);
    await user.addFollower(email);
    res.status(200).json(user);
  } catch (error) {
    res.status(422).json({ errors: ["Unable to add follower", error.message] });
  }
};

const readFollowers = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await userService.getUserByPK(email);
    const followers = await user.getFollowers();
    res.status(200).json(followers);
  } catch (error) {
    res
      .status(422)
      .json({ errors: ["Unable to read followers", error.message] });
  }
};

const readFollowedUsers = async (req, res) => {
  try {
    const { email } = req.params;
    const followedUsers = await db.sequelize.query(
      'select u.email , u.username , u.bio, pp."path" from "articles"."Followers" f inner join "articles"."Users" u on f."UserEmail" = u.email full join "articles"."ProfilePictures" pp on pp."UserEmail" = u."email" where f."FollowerEmail" = ?',
      {
        replacements: [email],
        type: QueryTypes.SELECT,
        model: User,
      }
    );
    res.status(200).json(followedUsers);
  } catch (error) {
    res
      .status(422)
      .json({ errors: ["Unable to read followed acounts", error.message] });
  }
};
module.exports.addFollower = addFollower;
module.exports.readFollowers = readFollowers;
module.exports.readFollowedUsers = readFollowedUsers;
