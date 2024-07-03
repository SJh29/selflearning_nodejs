mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    // Remove the _id and __v fields from the output
    delete ret._id;
    delete ret.__v;
    delete ret.password;
    return ret;
  },
});
const userData = mongoose.model("User", userSchema);

module.exports = userData;
