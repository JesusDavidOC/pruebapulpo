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
    color: {
      type: String,
      required: true,
      enum: [
        "#FF3F33",
        "#FFE433",
        "#6AFF33",
        "#33D7FF",
        "#3256ED",
        "#D033FF",
        "#FFFFFF",
        "#000000",
      ],
    },
    status: {
      type: Boolean,
      default: true,
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

vehicleSchema.statics.updateLog = async (serialCode, action, change) => {
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

vehicleSchema.statics.getBasicsValues = async (filters) => {
  // Found filters from collection "Filters"
  try {
    let brands = Vehicle.schema.path("brand").enumValues;
    let colors = Vehicle.schema.path("color").enumValues;
    let serialCodeValidate = Vehicle.schema
      .path("serialCode")
      .validators.filter((iterator) => {
        return iterator.type == "user defined";
      })[0]["validator"];
    console.log(serialCodeValidate.toString());
    return { brands, colors, serialCodeValidate:serialCodeValidate.toString() };
  } catch (error) {
    throw new Error(error.message);
  }
};

vehicleSchema.statics.updateVehicle = async (id, vehicle) => {
  // Found filters from collection "Filters"
  try {
    let vehicleLog = await Vehicle.findOne({
      serialCode: id,
    });
    //si son diferentes id entonces hay que revisar que no exista otro vehiculo con el mismo ID
    if (vehicleLog) {
      let vehicleK = await Vehicle.findOne({
        serialCode: vehicle.serialCode,
      });
      updateLocalLog = async () => {
        for (let key in Object.keys(vehicle)) {
          if (Object.keys(vehicle)[key] != "log") {
            let valueNew = vehicle[Object.keys(vehicle)[key]];
            let valueOld = vehicleLog[Object.keys(vehicle)[key]];
            if (valueOld != valueNew) {
              await Vehicle.updateLog(id, "update", {
                param: Object.keys(vehicle)[key],
                change: valueNew,
              });
            }
          }
        }
      };
      if (id.toLowerCase() != vehicle.serialCode.toLowerCase()) {
        if (vehicleK) {
          throw new Error("duplicate ID");
        } else {
          updateLocalLog();
          return await Vehicle.updateOne({ serialCode: id }, vehicle);
        }
      } else {
        updateLocalLog();
        return await Vehicle.updateOne({ serialCode: id }, vehicle);
      }
    } else {
      throw new Error("Vehicle not found");
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
