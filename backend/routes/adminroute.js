const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

router.post("/login", adminController.login);
router.get("/", adminController.getAllAdmins);
router.post("/", adminController.createAdmin);

module.exports = router;