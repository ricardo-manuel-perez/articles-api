const Article = require("../../models").Article;
const User = require("../../models").User;
const Favourite = require("../../models").Favourite;
const userService = require("../services/user.service");
const articleService = require("../services/article.service");

const addFavorite = async (req, res) => {
  try {
    const article = await articleService.getArticleByPk(req.params.slug);
    if (!article) {
      res.status(404);
      throw new Error("Article not found");
    }
    await article.addUser(req.params.email);
    res.json(article);
  } catch (e) {
    const code = res.statusCode ? res.statusCode : 422;
    res
      .status(code)
      .json({ errors: ["Unable to add new favourite", e.message] });
  }
};

const removeFavourite = async (req, res) => {
  try {
    const article = await articleService.getArticleByPk(req.params.slug);
    if (!article) {
      res.status(404);
      throw new Error("Article not found");
    }
    await article.removeUsers(req.params.email);
    res.json(article);
  } catch (e) {
    const code = res.statusCode ? res.statusCode : 422;
    res
      .status(code)
      .json({ errors: ["Unable to remove favourite", e.message] });
  }
};

const getFavouritesByUser = async (req, res) => {
  try {
    const { email } = req.params;
    const articles = await userService.getUserByPK(email, {
      include: Article,
    });
    res.status(200).json(articles);
  } catch (e) {
    const code = res.statusCode ? res.statusCode : 422;
    res
      .status(code)
      .json({ errors: ["Unable to find user favourites", e.message] });
  }
};

module.exports.addFavorite = addFavorite;
module.exports.removeFavourite = removeFavourite;
module.exports.getFavouritesByUser = getFavouritesByUser;
