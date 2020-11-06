const express = require("express");
const topicController = require("../controllers/topicController");
const authController = require("../controllers/authController");
const commentRouter = require("../routes/commentRoutes");

const router = express.Router();

router
  .route("/")
  .get(topicController.getAllTopics)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    topicController.createTopic
  );

router
  .route("/:id")
  .get(topicController.getTopic)
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    topicController.updateTopic
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    topicController.deleteTopic
  );

router.use("/:topicId/comments", commentRouter);

module.exports = router;
