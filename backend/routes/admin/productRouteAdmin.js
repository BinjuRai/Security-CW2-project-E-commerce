// const express = require("express")
// const router = express.Router()
// const productController = require("../../controllers/admin/productmanagement")
// const upload = require("../../middlewares/fileupload")

// router.post(
//     "/",
//     upload.single("productImage"),
//     productController.createProduct
// )
// router.get(
//     "/",
//     productController.getProducts
// )

// router.get("/:id", productController.getProductById);

// router.put("/:id", upload.single("productImage"), productController.updateProduct);

// router.delete('/:id', productController.deleteProduct);
// router.get("/category/:categoryId", productController.getProductsByCategory)

// module.exports = router

// backend/routes/admin/productRouteAdmin.js
const express = require("express");
const router = express.Router();
const productController = require("../../controllers/admin/productmanagement");
const upload = require("../../middlewares/fileupload");
const {
  authenticateUser,
  isAdmin,
} = require("../../middlewares/authorizedUsers");

// ✅ FIXED: Added authentication middleware
router.post(
  "/",
  authenticateUser, // ✅ ADD THIS - Populates req.user
  isAdmin, // ✅ ADD THIS - Checks if admin
  upload.single("productImage"), // ✅ CHANGED from productImage to productImage
  productController.createProduct,
);

router.get("/", productController.getProducts);

router.get("/:id", productController.getProductById);

router.get("/category/:categoryId", productController.getProductsByCategory);

router.put(
  "/:id",
  authenticateUser, // ✅ ADD THIS
  isAdmin, // ✅ ADD THIS
  upload.single("productImage"), // ✅ CHANGED from productImage
  productController.updateProduct,
);

router.delete(
  "/:id",
  authenticateUser, // ✅ ADD THIS
  isAdmin, // ✅ ADD THIS
  productController.deleteProduct,
);

module.exports = router;
