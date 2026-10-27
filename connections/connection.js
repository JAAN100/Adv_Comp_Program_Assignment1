const mongoose = require("mongoose");

async function ConnectedToMongoDB(URL) {
  return await mongoose.connect(URL);
}

module.exports = {
  ConnectedToMongoDB,
};
