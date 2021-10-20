const User = require("../../models").User;
const ProfilePicture = require("../../models").ProfilePicture;
module.exports = {
  createUser: async (userData) => {
    try {
      return await User.create(userData);
    } catch (error) {
      throw new Error(error);
    }
  },
  getUserByPK: async (email, options) => {
    try {
      return await User.findByPk(email, options);
    } catch (e) {
      throw new Error(e);
    }
  },
  updateUser: async (user, updatedData) => {
    try {
      return await user.update(updatedData);
    } catch (e) {
      throw new Error(e);
    }
  },
  updateUserPicture: async (relationId, newImageData) => {
    try {
      if (relationId) {
        const currentImage = await ProfilePicture.findByPk(relationId);
        return await currentImage.update(newImageData);
      } else {
        return await ProfilePicture.create(newImageData);
      }
    } catch (e) {
      throw new Error(e);
    }
  },
};
