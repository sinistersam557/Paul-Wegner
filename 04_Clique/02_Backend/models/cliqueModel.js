const mongoose = require("mongoose")
require('../connections/mongoConnection')

const cliqueSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    mainInterest: { type: String },
    userList: { type: [String] },
    inviteList: { type: [String] }
  }
);

const cliqueModel = mongoose.model("cliques", cliqueSchema)

module.exports = cliqueModel;