const userK = require("../models/users.model.js");
const bcrypt = require("bcryptjs");
// Create and save a new User
exports.create = async (req, res) => {
  // Validate if the request's body is empty
  // (does not include required data)
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "User data can not be empty",
    });
  }
  try {
    const user = new userK(req.body);
    await user.save((err) => {
      if (err) {
        if (err == "duplicate username") {
          res.status(400).send({ message: "Error: duplicate username" });
        } else {
          console.log(err);
          res.status(400).send({ message: "Error:Unknow error creating user" });
        }
      } else {
        res.status(200).send({ user, message: "OK" });
        //console.log("Data item is modified and saved in the db");
      }
      //do what you want to do after the operation completes.
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

// Login user and set AuthToken
exports.login = async (req, res) => {
  // Validate if the request's body is empty
  // (does not include required data)
  if (
    Object.keys(req.body).length === 0 ||
    req.body.password == "" ||
    req.body.username == ""
  ) {
    return res.status(400).send({
      message: "User data can not be empty",
    });
  }
  try {
    const username = req.body.username;
    const password = req.body.password;
    let sesion = await userK.loginByCredentials(username, password);
    //console.log(sesion);
    res.status(200).send({ message: "OK", sesion });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
//found users by filters
exports.getByFilters = async (req, res) => {
  res.status(400).send(new Error("Coming soon...."));
  try {
    // var user = await userK.findUserByFilter(req.body);
    // res.status(200).send({ user });
  } catch (error) {
    //res.status(400).send(new Error("Coming soon...."));
  }
};
// Update a user by its id
exports.update = async (req, res) => {
  res.status(400).send(new Error("Coming soon...."));
  try {
    //var user = await userK.updateUser(req.params.DNI, req.body);
    //res.status(200).send({ user });
  } catch (error) {
    //res.status(400).send(error);
  }
};

exports.getByToken = async (token) => {
  try {
    var user = await userK.findOne({ token });
    if (Object.keys(user).length > 0) {
      return user;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
