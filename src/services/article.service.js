const Article = require("../../models").Article;

module.exports = {
  createArticle: async (articleData) => {
    try {
      return await Article.create(articleData);
    } catch (error) {
      throw new Error(error);
    }
  },
  getArticleByPk: async (slug, options) => {
    try {
      return await Article.findByPk(slug, options);
    } catch (error) {
      throw new Error(error);
    }
  },
  getAllArticlesCount: async (options) => {
    try {
      return await Article.findAndCountAll(options);
    } catch (error) {
      throw new Error(error);
    }
  },
  getAllArticles: async (options) => {
    try {
      return await Article.findAll(options);
    } catch (error) {
      throw new Error(error);
    }
  },
};
