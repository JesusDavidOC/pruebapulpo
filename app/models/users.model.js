const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
      minlength: 4,
      validate: /^[a-zA-Z\d]+$/,
      unique: true,
    },
    userType: {
      type: String,
      required: true,
      default: "Worker",
      enum: ["Admin", "Worker"],
    },
    password: {
      type: String,
      trim: true,
      minlength: 8,
      maxlength: 300,
      unique: false,
    },
    name: {
      type: String,
      index: false,
      required: true,
      maxlength: 40,
      minlength: 5,
      validate: /^[A-Za-z]+$/,
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "disabled"],
      required: true,
    },
    token: {
      type: String,
      default: "",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

//set mini-middleware to validate data
userSchema.pre("save", async function (next) {
  let users = await User.find({ username: this.username });
  // Hash the password before saving the user model
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  if (users.length > 0) {
    next("duplicate username");
  } else {
    next();
  }
});

//find users using filters

userSchema.statics.findUsersByNameOrUsername = async (text) => {
  // Found filters from collection "Filters"
  try {
    const users = await User.find(
      {
        $or: [
          { username: { $regex: text, $options: "i" } },
          { name: { $regex: text, $options: "i" } },
        ],
      },
      { password: 0 }
    );
    return users;
  } catch (err) {
    throw err;
  }
};

userSchema.methods.generateAuthToken = async (username) => {
  // Generate an auth token for the user
  const user = this;
  //ENV//
  const token = jwt.sign({ _id: user._id }, "WinterIsComingGOT2019");
  user.token = token;
  try {
    return await User.updateUserToken(username, token);
  } catch (err) {
    throw err;
  }
};

userSchema.statics.updateUserToken = async (username, token) => {
  // Update user using the username and password.
  try {
    const user = await User.findOneAndUpdate(
      { username: username },
      {
        $set: {
          token: token,
        },
      },
      {
        new: true,
      }
    );
    return "OK";
  } catch (error) {
    throw error;
  }
};

userSchema.statics.loginByCredentials = async (username, password) => {
  // Search for a user by username.
  try {
    let user = await User.findOne({ username: username });
    if (!user) {
      throw new Error("Invalid login credentials");
    }
    //compare password using bcrypt
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new Error("Invalid login credentials");
    }
    user.password = "";
    let res = await user.generateAuthToken(username);
    if (res != "OK") {
      throw new Error("Unknow error setting token");
    }
    user = await User.findOne({ username: username });
    return user;
  } catch (error) {    
    throw new Error(error.message);
  }
};

const User = mongoose.model("users", userSchema);
module.exports = User;
