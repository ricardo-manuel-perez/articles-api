const express = require("express");
const {
  createArticle,
  getArticleBySlug,
  getPaginatedArticles,
  getArticlesByUser,
  externalService,
  commentArticle,
} = require("../controllers/Article");
const verifyToken = require("../middleware/auth");
const joiMiddleware = require("../middleware/joi_middleware");
const articleSchema = require("../schemas/Article_Schema");
const { PaginationSchema } = require("../schemas/Pagination_Schema");
const router = express.Router();
const { ArticleCommentSchema } = require("../schemas/Article_Schema");

router.post("/articles", joiMiddleware(articleSchema, "body"), createArticle);
router.get("/articles/:slug", getArticleBySlug);
router.get(
  "/paginatedArticles/",
  joiMiddleware(PaginationSchema, "query"),
  getPaginatedArticles
);
router.get("/external", externalService);
router.get(
  "/articles/user/:email",
  joiMiddleware(PaginationSchema, "query"),
  getArticlesByUser
);
router.post(
  "/articles/comment",
  joiMiddleware(ArticleCommentSchema, "body"),
  commentArticle
);
module.exports = router;
