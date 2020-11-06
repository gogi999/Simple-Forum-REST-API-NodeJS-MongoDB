const mongoose = require("mongoose");
const slugify = require("slugify");
// const User = require("./userModel");
// const validator = require('validator');

const topicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A topic must have a title!"],
      unique: true,
      maxlength: [
        40,
        "A topic title must have less or equal then 40 characters",
      ],
      minlength: [2, "A topic title must have more or equal then 2 characters"],
    },
    slug: String,
    content: {
      type: String,
      required: [true, "A topic must have a content!"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: true,
    },
    admins: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual populate
topicSchema.virtual("comments", {
  ref: "Comment",
  foreignField: "topic",
  localField: "_id",
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
topicSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

topicSchema.pre(/^find/, function (next) {
  this.populate({
    path: "admins",
    select: "-__v -createdAt",
  });

  next();
});

const Topic = mongoose.model("Topic", topicSchema);

module.exports = Topic;
