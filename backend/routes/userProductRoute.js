const express = require("express")
const router = express.Router()
const productController = require("../../backend/controllers/userProduct")
const upload = require("../middlewares/fileupload")

router.post(
    "/",
       upload.single("imagepath"),
    productController.createProduct
)
router.get(
    "/",
    productController.getProducts
)

router.get("/:id", productController.getProductById);


router.put("/:id", upload.single("imagepath"), productController.updateProduct);

router.delete('/:id', productController.deleteProduct);
router.get("/category/:categoryId", productController.getProductsByCategory)


module.exports = router
