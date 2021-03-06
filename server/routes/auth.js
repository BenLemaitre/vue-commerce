const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/verify-token");

// Signup route
router.post("/auth/signup", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.json({ success: false, message: "Please enter email or password" });
  } else {
    try {
      let newUser = new User();
      newUser.name = req.body.name;
      newUser.email = req.body.email;
      newUser.password = req.body.password;
      await newUser.save();
      let token = jwt.sign(newUser.toJSON(), process.env.SECRET, {
        expiresIn: 604800 // 1 week
      });

      res.json({
        success: true,
        token: token,
        message: "User created"
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    }
  }
});

// Profile route
router.get("/auth/user", verifyToken, async (req, res) => {
  try {
    let foundUser = await User.findOne({ _id: req.decoded._id })
      .populate("address")
      .exec();

    if (foundUser) {
      res.json({
        success: true,
        user: foundUser
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// Login route
router.post("/auth/login", async (req, res) => {
  try {
    let foundUser = await User.findOne({ email: req.body.email });
    console.log(foundUser);
    if (!foundUser) {
      res.status(403).json({
        success: false,
        message: "Authentication failed, user not found !"
      });
    } else {
      if (foundUser.comparePassword(req.body.password)) {
        let token = jwt.sign(foundUser.toJSON(), process.env.SECRET, {
          expiresIn: 604800 // 1 week
        });

        res.json({ success: true, token: token });
      } else {
        res.status(403).json({
          success: false,
          message: "Authentication failed, wrong password !"
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// Profile update route
router.put("/auth/update", verifyToken, async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.oldEmail }).populate(
      "address"
    );

    if (!user) {
      res.status(403).json({
        success: false,
        message: "Update failed, user not found !"
      });
    } else {
      if (req.body.name) user.name = req.body.name;
      if (req.body.email) user.email = req.body.email;
      if (req.body.password) user.password = req.body.password;

      user.save();

      res.json({
        success: true,
        message: "User updated !"
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
