const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  fullname: String,
  country: String,
  state: String,
  zipCode: String,
  city: String,
  streetAddress: String,
  securityCode: String,
  deliveryInstructions: String,
  phoneNumber: String
});

module.exports = mongoose.model("Address", AddressSchema);
