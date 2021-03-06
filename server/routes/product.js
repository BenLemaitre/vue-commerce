const router = require("express").Router();
const Product = require("../models/product");

const upload = require("../middlewares/upload-photo");

// POST
router.post("/products", upload.single("photo"), async (req, res) => {
  try {
    let product = new Product();
    product.title = req.body.title;
    product.description = req.body.description;
    product.photo = req.file.location;
    product.price = req.body.price;
    product.stockQuantity = req.body.stockQuantity;
    product.ownerId = req.body.ownerId;
    product.categoryId = req.body.categoryId;

    await product.save();

    res.json({
      success: true,
      message: "Saved!"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// GET - Get all products
router.get("/products", async (req, res) => {
  try {
    let products = await Product.find()
      .populate("owner category")
      .populate("reviews", "rating")
      .exec();
    res.json({
      success: true,
      products
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// GET - Get a single product
router.get("/products/:id", async (req, res) => {
  try {
    let product = await Product.findOne({ _id: req.params.id })
      .populate("category owner")
      .populate("reviews", "rating")
      .exec();
    res.json({
      success: true,
      product
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// PUT
router.put("/products/:id", upload.single("photo"), async (req, res) => {
  try {
    let file;
    if (req.file) {
      file = req.file.location;
    }

    let product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          price: req.body.price,
          photo: file,
          category: req.body.categoryId,
          owner: req.body.ownerId
        }
      },
      { upsert: true }
    );
    res.json({
      success: true,
      product
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// DELETE
router.delete("/products/:id", async (req, res) => {
  try {
    let product = await Product.findOneAndDelete({ _id: req.params.id });

    if (product) {
      res.json({
        success: true,
        message: "deleted!"
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
