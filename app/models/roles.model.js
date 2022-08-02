const mongoose = require("mongoose");

const roleSchema = mongoose.Schema({
  userType: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
});

roleSchema.index({ userType: 1, action: 1 }, { unique: true });

roleSchema.statics.isEnabled = async (userType, action) => {  
  try {    
    const role = await Role.findOne({ userType, action });    
    return Object.keys(role).length > 0;
  } catch (error) {
    return false;
  }
};

roleSchema.statics.disable = async (userType, action) => {
  // Update user using the username and password.
  try {
    await Role.findOneAndDelete({ userType, action });
    return "OK";
  } catch (error) {
    throw new Error("Unknow error disabling role");
  }
};

const Role = mongoose.model("roles", roleSchema);
module.exports = Role;
