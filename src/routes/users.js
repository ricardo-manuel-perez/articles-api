const express = require("express");
const cookie = require("cookie");
const router = express.Router();

const { PROFILE_PICTURES_PATH, PICTURE_MAX_SIZE } = require("../constants");
const FileManager = require("../services/files");

const fileManager = new FileManager();
const savePicture = fileManager.saveFile(
  PROFILE_PICTURES_PATH,
  PICTURE_MAX_SIZE
);
const joiMiddleware = require("../middleware/joi_middleware");

const UserController = require("../controllers/User");
const { UserEmail, UpdateUser } = require("../schemas/User_Schema");
const UserSchema = require("../schemas/User_Schema");

router.post(
  "/users",
  joiMiddleware(UserSchema, "body"),
  UserController.createUser
);
router.put(
  "/users",
  joiMiddleware(UpdateUser, "body"),
  UserController.updateUserData
);
router.post(
  "/users/profile-picture/:email",
  savePicture,
  UserController.uploadPorfilePicture
);
module.exports = router;
