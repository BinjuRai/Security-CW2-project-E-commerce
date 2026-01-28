

const express = require("express");
const router = express.Router();
const { authenticateUser, isAdmin } = require("../../middlewares/authorizedUsers");
const {
    getDashboardStats,
    getSecurityLogs,
    unlockUserAccount
} = require("../../controllers/admin/adminDashboardController");


router.get(
    "/stats",
    authenticateUser,
    isAdmin,
    getDashboardStats
);


router.get(
    "/security-logs",
    authenticateUser,
    isAdmin,
    getSecurityLogs
);

router.post(
    "/users/:id/unlock",
    authenticateUser,
    isAdmin,
    unlockUserAccount
);

module.exports = router;