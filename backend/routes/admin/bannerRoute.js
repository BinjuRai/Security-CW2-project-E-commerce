const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  createBanner,
  getAllBanners,
  deleteBanner,
} = require("../../controllers/admin/bannercontroller");
const {
  authenticateUser,
  isAdmin,
} = require("../../middlewares/authorizedUsers");

// ✅ Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/banners/"); // ✅ Separate folder for banners
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "banner-" + uniqueSuffix + path.extname(file.originalname));
  },
});

// ✅ File filter for images only
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // ✅ 5MB limit
});

// ==========================================
// ROUTES
// ==========================================

// ✅ CREATE BANNER (Admin Only)
router.post(
  "/",
  authenticateUser, // ✅ Check if logged in
  isAdmin, // ✅ Check if admin
  upload.single("image"),
  createBanner,
);

// ✅ GET ALL BANNERS (Public - no auth needed)
router.get("/", getAllBanners);

// ✅ DELETE BANNER (Admin Only)
router.delete(
  "/:id",
  authenticateUser, // ✅ Check if logged in
  isAdmin, // ✅ Check if admin
  deleteBanner,
);

module.exports = router;
