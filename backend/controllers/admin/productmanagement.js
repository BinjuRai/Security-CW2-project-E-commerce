// const fs = require("fs");
// const path = require("path");
// const Product = require("../../models/Product")

// exports.createProduct = async (req, res) => {
//   const { name, price, description, categoryId, userId } = req.body;
//   const productImage = req.file ? req.file.path : null;

//   let addons = [];
//   try {
//     if (req.body.addons) {
//       addons = typeof req.body.addons === "string" ? JSON.parse(req.body.addons) : req.body.addons;
//     }
//   } catch (err) {
//     return res.status(400).json({
//       success: false,
//       message: "Invalid addons format. Must be valid JSON.",
//     });
//   }

//   if (!name || !price || !categoryId || !userId) {
//     return res.status(403).json({
//       success: false,
//       message: "Missing required field",
//     });
//   }

//   try {
//     const product = new Product({
//       name,
//       price,
//       description,
//       categoryId,
//       sellerId: userId,
//       productImage,
//       addons,
//     });

//     await product.save();

//     return res.status(200).json({
//       success: true,
//       data: product,
//       message: "New Product Created",
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

// exports.createProduct = async (req, res) => {
//     const { name, price, description, categoryId, bagType, stock, isFeatured } = req.body;

//     // ✅ Store only filename
//     const productImage = req.file ? req.file.filename : null;

//     if (!name || !price || !categoryId) {
//         return res.status(400).json({
//             success: false,
//             message: "Missing required fields (name, price, categoryId)",
//         });
//     }

//     try {
//         const product = new Product({
//             name,
//             price,
//             description,
//             categoryId,
//             bagType,
//             stock: stock || 0,
//             isFeatured: isFeatured === 'true' || isFeatured === true,
//             imagepath,  // ✅ Use imagepath, not productImage
//         });

//         await product.save();

//         return res.status(201).json({
//             success: true,
//             data: product,
//             message: "Product created successfully",
//         });
//     } catch (err) {
//         console.error("Create product error:", err);
//         return res.status(500).json({
//             success: false,
//             message: "Server error",
//             error: err.message
//         });
//     }
// };

// exports.updateProduct = async (req, res) => {
//     const productId = req.params.id;
//     const { name, price, description, categoryId, bagType, stock, isFeatured } = req.body;

//     try {
//         const product = await Product.findById(productId);
//         if (!product) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Product not found"
//             });
//         }

//         // Update fields
//         product.name = name || product.name;
//         product.price = price || product.price;
//         product.description = description || product.description;
//         product.categoryId = categoryId || product.categoryId;
//         product.bagType = bagType || product.bagType;
//         product.stock = stock !== undefined ? stock : product.stock;
//         product.isFeatured = isFeatured !== undefined
//             ? (isFeatured === 'true' || isFeatured === true)
//             : product.isFeatured;

//         // ✅ Store only filename if new image uploaded
//         if (req.file) {
//             product.imagepath = req.file.filename;  // ✅ Use imagepath
//         }

//         await product.save();

//         return res.status(200).json({
//             success: true,
//             message: "Product updated successfully",
//             data: product,
//         });
//     } catch (err) {
//         console.error("Update product error:", err);
//         return res.status(500).json({
//             success: false,
//             message: "Server error",
//             error: err.message
//         });
//     }
// };

// exports.getProducts = async (req, res) => {
//   try {
//     const { page = 1, limit = 10, search = "" } =
//       req.query

//     let filter = {}
//     if (search) {
//       filter.$or = [
//         {
//           name:
//           {
//             $regex: search,
//             $options: 'i'
//           }
//         }
//       ]
//     }
//     const skips = (page - 1) * limit

//     const products = await Product.find(filter)
//       .populate("categoryId", "name")
//       .populate("sellerId", "firstName email")
//       .skip(skips)
//       .limit(Number(limit))
//     const total = await Product.countDocuments(filter)
//     return res.status(200).json(
//       {
//         success: true,
//         message: "Requested Product Fetched",
//         data: products,
//         pagination: {
//           total,
//           page: Number(page),
//           limit: Number(limit),
//           totalPages: Math.ceil(
//             total / limit
//           )
//         }
//       }
//     )
//   } catch (err) {
//     console.log('getProducts', {
//       message: err.message,
//       stack: err.stack,
//     });
//     return res.status(500).json(
//       { success: false, message: "Server error" }
//     )
//   }
// }

// exports.deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found"
//       });
//     }

//     // Delete the image file from disk (if it exists)
//     if (product.productImage) {
//       const imagePath = path.join(__dirname, "..", "..", "uploads", product.productImage);
//       fs.unlink(imagePath, (err) => {
//         if (err) {
//           console.warn("Image file deletion failed or not found:", err.message);
//           // Not returning error here so deletion can proceed even if image missing
//         }
//       });
//     }

//     await product.deleteOne();

//     return res.json({
//       success: true,
//       message: "Product has been deleted"
//     });
//   } catch (err) {
//     console.error("Error deleting product:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Server Error"
//     });
//   }
// };
// exports.updateProduct = async (req, res) => {
//   const productId = req.params.id;

//   const { name, price, description, categoryId } = req.body;
//   let addons = [];

//   try {
//     if (req.body.addons) {
//       addons = typeof req.body.addons === "string" ? JSON.parse(req.body.addons) : req.body.addons;
//     }
//   } catch (err) {
//     return res.status(400).json({
//       success: false,
//       message: "Invalid addons format. Must be valid JSON.",
//     });
//   }

//   try {
//     const product = await Product.findById(productId);

//     if (!product) {
//       return res.status(404).json({ success: false, message: "Product not found" });
//     }

//     // Update fields
//     product.name = name || product.name;
//     product.price = price || product.price;
//     product.description = description || product.description;
//     product.categoryId = categoryId || product.categoryId;

//     if (req.file) {
//       product.productImage = req.file.path;
//     }

//     if (addons.length > 0) {
//       product.addons = addons;
//     }

//     await product.save();

//     return res.status(200).json({
//       success: true,
//       message: "Product updated successfully",
//       data: product,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// };

// exports.getProductById = async (req, res) => {
//   try {
//     const productId = req.params.id;

//     const product = await Product.findById(productId)
//       .populate("categoryId", "name")
//       .populate("sellerId", "firstName email");

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Product fetched successfully",
//       data: product,
//     });
//   } catch (err) {
//     console.error("getProductById Error:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

// exports.getProductsByCategory = async (req, res) => {
//   try {
//     const categoryId = req.params.categoryId

//     const products = await Product.find({ categoryId })
//       .populate("categoryId", "name")
//       .populate("sellerId", "firstName email") // optional, for UI

//     return res.status(200).json({
//       success: true,
//       message: "Products fetched by category",
//       data: products
//     })
//   } catch (err) {
//     console.error("getProductsByCategory Error:", err)
//     return res.status(500).json({
//       success: false,
//       message: "Server error"
//     })
//   }
// }

const fs = require("fs");
const path = require("path");
const Product = require("../../models/Product");

// ==========================================
// CREATE PRODUCT
// ==========================================
// exports.createProduct = async (req, res) => {
//     const { name, price, description, categoryId, bagType, stock, isFeatured } = req.body;

//     // ✅ Get userId from authenticated user (req.user populated by authenticateUser middleware)
//     const userId = req.user._id;

//     // ✅ Store only filename
//     const productImage = req.file ? req.file.filename : null;

//     if (!name || !price || !categoryId) {
//         return res.status(400).json({
//             success: false,
//             message: "Missing required fields (name, price, categoryId)",
//         });
//     }

//     try {
//         const product = new Product({
//             name,
//             price,
//             description,
//             categoryId,
//             bagType,
//             stock: stock || 0,
//             isFeatured: isFeatured === 'true' || isFeatured === true,
//             productImage,
//             sellerId: userId  // ✅ Use authenticated user's ID
//         });

//         await product.save();

//         return res.status(201).json({
//             success: true,
//             data: product,
//             message: "Product created successfully",
//         });
//     } catch (err) {
//         console.error("Create product error:", err);
//         return res.status(500).json({
//             success: false,
//             message: "Server error",
//             error: err.message
//         });
//     }
// };
exports.createProduct = async (req, res) => {
  const { name, price, description, categoryId, bagType, stock, isFeatured } =
    req.body;

  const userId = req.user._id;

  // ✅ FIXED: Store full path instead of just filename
  const productImage = req.file ? req.file.path : null;

  if (!name || !price || !categoryId) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields (name, price, categoryId)",
    });
  }

  try {
    const product = new Product({
      name,
      price,
      description,
      categoryId,
      bagType,
      stock: stock || 0,
      isFeatured: isFeatured === "true" || isFeatured === true,
      productImage,
      sellerId: userId,
    });

    await product.save();

    return res.status(201).json({
      success: true,
      data: product,
      message: "Product created successfully",
    });
  } catch (err) {
    console.error("Create product error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

// ==========================================
// UPDATE PRODUCT
// ==========================================
exports.updateProduct = async (req, res) => {
  const productId = req.params.id;
  const { name, price, description, categoryId, bagType, stock, isFeatured } =
    req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Update fields
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.categoryId = categoryId || product.categoryId;
    product.bagType = bagType || product.bagType;
    product.stock = stock !== undefined ? stock : product.stock;
    product.isFeatured =
      isFeatured !== undefined
        ? isFeatured === "true" || isFeatured === true
        : product.isFeatured;

    // ✅ Store only filename if new image uploaded
    if (req.file) {
      product.productImage = req.file.path;
    }

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (err) {
    console.error("Update product error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

// ==========================================
// GET PRODUCTS
// ==========================================
exports.getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    let filter = {};
    if (search) {
      filter.$or = [{ name: { $regex: search, $options: "i" } }];
    }
    const skips = (page - 1) * limit;

    const products = await Product.find(filter)
      .populate("categoryId", "name")
      .populate("sellerId", "firstName email")
      .skip(skips)
      .limit(Number(limit));

    const total = await Product.countDocuments(filter);

    return res.status(200).json({
      success: true,
      message: "Requested Product Fetched",
      data: products,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("getProducts", {
      message: err.message,
      stack: err.stack,
    });
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ==========================================
// DELETE PRODUCT
// ==========================================
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Delete the image file from disk (if it exists)
    if (product.productImage) {
      const productImage = path.join(
        __dirname,
        "..",
        "..",
        "uploads",
        product.productImage,
      );
      fs.unlink(productImage, (err) => {
        if (err) {
          console.warn("Image file deletion failed or not found:", err.message);
        }
      });
    }

    await product.deleteOne();

    return res.json({
      success: true,
      message: "Product has been deleted",
    });
  } catch (err) {
    console.error("Error deleting product:", err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==========================================
// GET PRODUCT BY ID
// ==========================================
exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId)
      .populate("categoryId", "name")
      .populate("sellerId", "firstName email");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: product,
    });
  } catch (err) {
    console.error("getProductById Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ==========================================
// GET PRODUCTS BY CATEGORY
// ==========================================
exports.getProductsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    const products = await Product.find({ categoryId })
      .populate("categoryId", "name")
      .populate("sellerId", "firstName email");

    return res.status(200).json({
      success: true,
      message: "Products fetched by category",
      data: products,
    });
  } catch (err) {
    console.error("getProductsByCategory Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
