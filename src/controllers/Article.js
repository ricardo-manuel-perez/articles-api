const axios = require("axios");

const constants = require("../constants");
const { TOPIC_POSTS, TOPIC_COMMENTS } = constants;
const Comment = require("../../models").Comment;
const User = require("../../models").User;
const { slugify } = require("../utils/stringUtil");
const articleService = require("../services/article.service");
const kafkaService = require("../services/kafka.service");
const {
  getPaginationValues,
  calculateTotalPages,
} = require("../utils/paginationUtil");
// save methods

const postArticle = async (req, res) => {
  let populatedArticle = null;
  try {
    const user = await User.findByPk(req.body.email);
    if (!user) {
      throw new Error("User does not exist");
    }
    const slug = slugify(req.body.title) + `-${Date.now()}`;
    const article = await articleService.createArticle({
      slug: slug,
      title: req.body.title,
      description: req.body.description,
      body: req.body.body,
      UserEmail: req.body.email,
    });
    populatedArticle = await articleService.getArticleByPk(slug, {
      include: [{ model: User, attributes: ["email", "username"] }],
    });
    res.status(201).json({ populatedArticle });
  } catch (e) {
    res
      .status(422)
      .json({ errors: { body: ["Could not create article", e.message] } });
  }
  kafkaService.kafkaSendMessage(TOPIC_POSTS, populatedArticle);
};

const commentArticle = async (req, res) => {
  let comment = null;
  try {
    const { email, commentBody, articleSlug } = req.body;
    comment = await Comment.create({ body: commentBody });
    await comment.setUser(email);
    await comment.setArticle(articleSlug);
    res.status(201).json(comment);
  } catch (error) {
    res
      .status(422)
      .json({ errors: { body: ["Could not comment article", error.message] } });
  }
  kafkaSendMessage(TOPIC_COMMENTS, comment);
};

// retrive data methods

const getArticleBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const article = await articleService.getArticleByPk(slug, {
      include: [
        { model: User, attributes: ["email", "username"] },
        { model: Comment },
      ],
    });
    res.status(200).json(article);
  } catch (e) {
    res
      .status(422)
      .json({ errors: { body: ["Could not find article", e.message] } });
  }
};

const getPaginatedArticles = async (req, res) => {
  try {
    const { size, page } = req.query;
    const { offset, limit } = getPaginationValues(page, size);
    const articles = await articleService.getAllArticlesCount({
      offset: offset,
      limit: limit,
      include: [{ model: User }, { model: Comment }],
    });
    const pagination = {
      articles: articles.rows,
      totalPages: calculateTotalPages(articles.count, size),
      currentPage: parseInt(page),
    };
    res.status(200).json(pagination);
  } catch (e) {
    res
      .status(422)
      .json({ errors: { body: ["Could not load article", e.message] } });
  }
};

const getArticlesByUser = async (req, res) => {
  try {
    const { size, page } = req.query;
    const { offset, limit } = getPaginationValues(page, size);
    const { email } = req.params;
    const articles = await articleService.getAllArticlesCount({
      offset: offset,
      limit: limit,
      where: { UserEmail: email },
      include: { model: User },
    });
    res.status(200).json(articles);
  } catch (e) {
    res
      .status(422)
      .json({ errors: { body: ["Could not load feed data", e.message] } });
  }
};

const externalService = async (req, res) => {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon/ditto");
    res.status(200).send(response.data);
  } catch (e) {
    res.status(422).json({
      errors: { body: ["Could not connect to external source", e.message] },
    });
  }
};

module.exports.createArticle = postArticle;
module.exports.getArticleBySlug = getArticleBySlug;
module.exports.getPaginatedArticles = getPaginatedArticles;
module.exports.getArticlesByUser = getArticlesByUser;
module.exports.externalService = externalService;
module.exports.commentArticle = commentArticle;
