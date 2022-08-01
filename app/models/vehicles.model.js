const mongoose = require("mongoose");

/**
 *
 *
 * LOGS FOR 'NOVEDADES'
 *
 *
 */

const changesSchema = mongoose.Schema({
  param: String,
  change: String,
});

const logsSchema = mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
      enum: ["update", "enable", "disable"],
    },
    change: {
      type: changesSchema,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

/**
 *
 * VEHICLE MODELS AN FUNCTIONS
 *
 *
 */
const colorSchema = mongoose.Schema({
  name: {
    type: String,
  },
  hex: {
    type: String,
  },
});
const vehicleSchema = mongoose.Schema(
  {
    serialCode: {
      type: String,
      required: true,
      trim: true,
      maxlength: 8,
      minlength: 7,
      validate: /(^([a-zA-Z\d]{3})-([a-zA-Z\d]{3,4}))/,
      unique: true,
    },
    brand: {
      type: String,
      required: true,
      enum: ["Mazda", "Toyota", "Volkswagen", "Renault", "KIA"],
    },
    model: {
      type: Number,
      required: true,
      min: 1800,
      max: 3000,
    },
    color: colorSchema,
    status: {
      type: String,
      default: "disabled",
      enum: ["active", "disabled"],
      required: true,
    },
    accessDate: {
      type: String,
     // default: new Date().toISOString().split("T")[0],
      required: true,
      validate: /(^(\d{4})-(\d{2})-(\d{2}))/,
    },
    log: [logsSchema],
  },
  {
    timestamps: true,
  }
);

vehicleSchema.pre("save", async function (next) {
  let vehicleK = await Vehicle.find({ serialCode: this.serialCode });
  if (vehicleK.length > 0) {
    next("Duplicate ID");
  } else {
    next();
  }
});

vehicleSchema.methods.updateLog = async (serialCode, action, change) => {
  // Generate an auth token for the user
  try {
    let vehicleU = await Vehicle.findOneAndUpdate(
      { serialCode },
      { $push: { log: { action, change } } }
    );
  } catch (err) {
    throw err;
  }
};

vehicleSchema.statics.findVehicleByFilter = async (filters) => {
  // Found filters from collection "Filters"
  try {
    if (filters["serialCode"]) {
      filters["serialCode"] = {
        $regex: filters["serialCode"],
        $options: "i",
      };
    }
    return await Vehicle.find(filters, {
      _id: 0,
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

vehicleSchema.statics.updateVehicle = async (id, vehicle) => {
  // Found filters from collection "Filters"
  try {
    let vehicleK = await Vehicle.findOne({
      serialCode: vehicle.serialCode,
    });
    //si son diferentes id entonces hay que revisar que no exista otro vehiculo con el mismo ID
    if (id.toLowerCase() != vehicle.serialCode.toLowerCase()) {
      if (Object.keys(vehicleK).length > 0) {
        throw new Error("duplicate ID");
      } else {
        let vehicleLog = await Vehicle.findOne({
          serialCode: id,
        });
        for (let key in Object.keys(vehicle)) {
          let valueNew = vehicle[Object.keys(vehicle)[key]];
          let valueOld = vehicleLog[Object.keys(vehicle)[key]];
          if (valueOld != valueNew) {
            Vehicle.updateLog(id, "update", {
              param: Object.keys(vehicle)[key],
              change: valueNew,
            });
          }
        }
        return await Vehicle.updateOne({ serialCode: id }, vehicle);
      }
    } else {
      return await Vehicle.updateOne({ serialCode: id }, vehicle);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

vehicleSchema.statics.deleteVehicle = async (id) => {
  // Found filters from collection "Filters"
  try {
    await Vehicle.deleteOne({ serialCode: id });
  } catch (error) {
    throw new Error(error.message);
  }
};
const Vehicle = mongoose.model("vehicles", vehicleSchema);
module.exports = Vehicle;
