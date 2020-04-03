const router = require("express").Router();
const Address = require("../models/address");
const User = require("../models/user");
const verifyToken = require("../middlewares/verify-token");
const axios = require("axios");

// Post - create address
router.post("/addresses", verifyToken, async (req, res) => {
  try {
    const address = new Address();

    address.user = req.decoded._id;
    address.fullname = req.body.fullname;
    address.country = req.body.country;
    address.state = req.body.state;
    address.zipCode = req.body.zipCode;
    address.city = req.body.city;
    address.streetAddress = req.body.streetAddress;
    address.securityCode = req.body.securityCode;
    address.deliveryInstructions = req.body.deliveryInstructions;
    address.phoneNumber = req.body.phoneNumber;

    await address.save();

    res.json({
      success: true,
      message: "Address saved!"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// GET - all addresses
router.get("/addresses", verifyToken, async (req, res) => {
  try {
    let addresses = await Address.find({ user: req.decoded._id });

    res.json({
      success: true,
      addresses: addresses
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// GET - single address
router.get("/addresses/:id", verifyToken, async (req, res) => {
  try {
    let address = await Address.findOne({ _id: req.params.id });

    res.json({
      success: true,
      address: address
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// GET - List of countries = https://restcountries.eu/rest/v2/all
router.get("/countries", async (req, res) => {
  try {
    let response = await axios.get("https://restcountries.eu/rest/v2/all");

    res.json(response.data);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// DELETE - delete address
router.delete("/addresses/:id", verifyToken, async (req, res) => {
  try {
    let address = await Address.remove({
      user: req.decoded._id,
      _id: req.params.id
    });

    if (address) {
      res.json({
        success: true,
        message: "Address deleted!"
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// PUT - update address
router.put("/addresses/:id", verifyToken, async (req, res) => {
  try {
    let address = await Address.findOneAndUpdate(
      { _id: req.params.id, user: req.decoded._id },
      {
        $set: {
          fullname: req.body.fullname,
          country: req.body.country,
          state: req.body.state,
          zipCode: req.body.zipCode,
          city: req.body.city,
          streetAddress: req.body.streetAddress,
          securityCode: req.body.securityCode,
          deliveryInstructions: req.body.deliveryInstructions,
          phoneNumber: req.body.phoneNumber
        }
      }
    );

    if (address) {
      res.json({
        success: true,
        message: "Address updated!"
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// set default address
router.put("/addresses/set/default", verifyToken, async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.decoded._id },
      { $set: { address: req.body.id } }
    );

    if (updatedUser) {
      res.json({
        success: true,
        message: "Address set as default!"
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;
