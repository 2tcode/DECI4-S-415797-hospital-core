const express = require("express");
const router = express.Router();

const doctorController = require("../controllers/doctorController");

router.get("/", doctorController.getDoctors);

router.post("/login", doctorController.login);

router.delete("/:id", doctorController.deleteDoctor);

router.post("/", doctorController.createDoctor);

module.exports = router;