const express = require("express");
const router = express.Router();

const patientController = require("../controllers/patientController");

router.get("/", patientController.getPatients);

router.put("/:id", patientController.updatePatient);

router.post("/", patientController.createPatient);

router.delete("/:id", patientController.deletePatient);

module.exports = router;