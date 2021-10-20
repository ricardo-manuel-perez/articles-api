const Sequelize = require("sequelize");
const User = require("../../models").User;
const ProfilePicture = require("../../models").ProfilePicture;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const FileManager = require("../services/files");
const { PROFILE_PICTURES_PATH, ADDRESS, PORT } = require("../constants");
const {
  getUserByPK,
  updateUser,
  updateUserPicture,
  createUser,
} = require("../services/user.service");

const defineTempUsername = (email) => {
  return email.split("@")[0];
};

const postUser = async (req, res) => {
  try {
    const existentEmail = await getUserByPK(req.body.email);
    if (existentEmail) {
      throw new Error("Credentials already taken");
    }
    const user = await createUser({
      username: req.body.username
        ? req.body.username
        : defineTempUsername(req.body.username),
      email: req.body.email,
    });

    res.status(201).json(user);
  } catch (e) {
    res
      .status(422)
      .json({ errors: { body: ["Could not create user", e.message] } });
  }
};

const uploadPorfilePicture = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await getUserByPK(email, {
      include: [{ model: ProfilePicture }],
    });
    const file = `${ADDRESS}:${PORT}${PROFILE_PICTURES_PATH}/${req.file.filename}`;
    if (user.ProfilePicture && user.ProfilePicture.filename) {
      await new FileManager().remove(
        `${PROFILE_PICTURES_PATH}/${user.ProfilePicture.filename}`
      );
    }
    const userProfilePicture = await updateUserPicture(
      user.ProfilePicture ? user.ProfilePicture.id : null,
      {
        filename: req.file.filename,
        path: file,
        UserEmail: email,
      }
    );
    user.setProfilePicture(userProfilePicture);
    res.status(201).json(user.ProfilePicture);
  } catch (e) {
    res
      .status(422)
      .json({ errors: { body: ["Could not upload your image", e.message] } });
  }
};

const updateUserDetails = async (req, res) => {
  try {
    const user = await getUserByPK(req.body.email, {
      attributes: ["email", "username", "bio"],
    });
    if (!user) {
      throw new Error("No user with this email id");
    }
    const bio = req.body.bio ? req.body.bio : user.bio;
    const updatedUser = await updateUser({ bio });
    res.json(updatedUser);
  } catch (e) {
    res
      .status(422)
      .json({ errors: { body: ["Could not find email", e.message] } });
  }
};

module.exports.createUser = postUser;
module.exports.updateUserData = updateUserDetails;
module.exports.uploadPorfilePicture = uploadPorfilePicture;
