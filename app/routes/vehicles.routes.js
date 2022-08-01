module.exports = (app) => {
  const vehicle = require("../controllers/vehicles.controller.js");
  const users = require("../controllers/users.controller.js");
  const roles = require("../controllers/roles.controller.js");
  /**
   *
   * function basics for roles
   *
   */

  app.post("/roles", roles.create);
  /**
   * DEFINE MIDDLEWARE FOR ROLES PERMISIONS AND THE USER SESION
   */

  app.use("/vehicles", async (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    let bearer = bearerHeader.split(" ")[1];
    let userF = await users.getByToken(bearer);
    //let directive = req.method + req.originalUrl;
    console.log(req.route.path);
    if (userF) {
      req.userActive = userF;
      next();
    } else {
      res.status(401).send({
        message: "Unauthorized",
      });
    }
  });

  //found vehicles by filter
  app.post("/vehicles/find", vehicle.getByFilters);
  // Create a new vehicle
  app.post("/vehicles", vehicle.create);
  // Update a user by ID
  app.put("/vehicles/:ID", vehicle.update);
};
