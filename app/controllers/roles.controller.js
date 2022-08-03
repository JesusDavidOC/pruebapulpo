const roleK = require("../models/roles.model.js");
// Create and save a new User
exports.create = async (req, res) => {
  // Validate if the request's body is empty
  // (does not include required data)
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Role data can not be empty",
    });
  }
  try {
    const role = new roleK(req.body);
    await role.save((err) => {
      if (err) {
        res.status(500).send({ message: "Error:Unknow error creating user" });
      } else {
        res.status(200).send({ role, message: "OK" });
        //console.log("Data item is modified and saved in the db");
      }
      //do what you want to do after the operation completes.
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

//found roles by filters
exports.getByFilters = async (req, res) => {
  res.status(400).send(new Error("Coming soon...."));
  try {
    // var user = await userK.findUserByFilter(req.body);
    // res.status(200).send({ user });
  } catch (error) {
    //res.status(400).send(new Error("Coming soon...."));
  }
};

exports.validate = async (userType, action) => {
  return roleK.isEnabled(userType, action);
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
