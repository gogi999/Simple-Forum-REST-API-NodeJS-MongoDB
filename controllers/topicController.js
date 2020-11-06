const Topic = require("../models/topicModel");
const factory = require("./handlerFactory");

exports.getAllTopics = factory.getAll(Topic);
exports.getTopic = factory.getOne(Topic, { path: "comments" });
exports.createTopic = factory.createOne(Topic);
exports.updateTopic = factory.updateOne(Topic);
exports.deleteTopic = factory.deleteOne(Topic);
