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

  let verifyRole = async (req, res, next) => {
    if (
      await roles.validate(req.userActive.userType, req.method + req.route.path)
    ) {
      next();
    } else {
      res.status(401).send({
        message: "Unauthorized",
      });
    }
  };

  app.use("/vehicles", async (req, res, next) => {
    try {
      const bearerHeader = req.headers["authorization"];
      let bearer = bearerHeader.split(" ")[1];
      let userF = await users.getByToken(bearer);
      if (userF) {
        req.userActive = userF;
        next();
      } else {
        res.status(401).send({
          message: "Unauthorized",
        });
      }
    } catch (error) {
      res.status(401).send({
        message: "Unauthorized",
      });
    }
  });

  //found vehicles by filter
  app.post("/vehicles/find", verifyRole, vehicle.getByFilters);
  // Create a new vehicle
  app.post("/vehicles", verifyRole, vehicle.create);
  // Update a vehicle by ID
  app.put("/vehicles/:id", verifyRole, vehicle.update);
  //get basic values from vehicles for create, edit and filters
  app.get("/vehicles/basics", vehicle.getBasics);

  app.delete("/vehicles/:id", vehicle.delete);
};
