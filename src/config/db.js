
const mongoose = require('mongoose');

module.exports.connect = async (mongoUrl) => {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected");
  } catch (err) {
    console.error(" MongoDB connection error:", err);
    process.exit(1);
  }
};
