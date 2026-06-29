const express = require("express");

const router = express.Router();


const productController =
    require("../controllers/product.controller");
const validate =
require("../middleware/validation.middleware");


const { productValidation} =require("../validations/product.validation");

// Create product
router.post(
"/",
productValidation,
validate,
productController.createProduct
);


// Get products dashboard
// GET /api/products
router.get(
    "/",
    productController.getProducts
);



// Increase/decrease stock
// PATCH /api/products/:id/stock
router.patch(
    "/:id/stock",
    productController.updateStock
);


module.exports = router;