const mongoose = require("mongoose");
const Topic = require("./topicModel");

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, "Review can not be empty!"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    topic: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Topic",
        required: [true, "Comment must belong to a topic!"],
      },
    ],
    user: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Comment must belong to a user!"],
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

commentSchema.pre(/^find/, function (next) {
  // this.populate({
  //   path: "topic",
  //   select: "title",
  // }).populate({
  //   path: "user",
  //   select: "name",
  // });

  this.populate({
    path: "user",
    select: "name",
  });

  next();
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
