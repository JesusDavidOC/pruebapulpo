const vehicleK = require("../models/vehicles.model.js");
// Create and save a new vechicle
exports.create = async (req, res) => {
  // Validate if the request's body is empty
  // (does not include required data)
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({
      message: "Vehicle data can not be empty",
    });
  }
  try {
    const vehicle = new vehicleK(req.body);
    await vehicle.save((err) => {
      if (err) {
        if (err == "duplicate ID") {
          res.status(400).send({ message: "Error: duplicate ID" });
        } else {          
          res.status(400).send({ message: "Error: Unknow error creating vechicle" });
        }
      } else {
        res.status(200).send({ vehicle, message: "OK" });
        //console.log("Data item is modified and saved in the db");
      }    
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

//found vechicles by filters
exports.getByFilters = async (req, res) => {
  try {
    var vehicles = await vehicleK.findVehicleByFilter(req.body);
    res.status(200).send({ vehicles });
  } catch (error) {
    res.status(400).send(error);
  }
};

//return the basiscs for filters, creation and editions
exports.getBasics = async (req, res) => {
  try {
    let basics = await vehicleK.getBasicsValues(req.body);
    res.status(200).send(basics);
  } catch (error) {
    res.status(400).send(error);
  }
};
// Update a vehicle by its id
exports.update = async (req, res) => {
  try {
    var vehicle = await vehicleK.updateVehicle(req.params.id, req.body);
    if(vehicle.modifiedCount){
      res.status(200).send({ message:"OK" });  
    }
    if(!vehicle.modifiedCount){
      res.status(500).send({ message:"Error: Unknow error updating the vehicle" });  
    }    
  } catch (error) {    
    res.status(400).send({message:error.message});
  }
};
