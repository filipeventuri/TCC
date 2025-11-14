const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { getDashboardData, getRecentCashflow } = require("../controllers/dashboardController");

const router = express.Router();

router.get("/", protect, getDashboardData);
router.get("/cashflow", protect, getRecentCashflow);


module.exports = router;
