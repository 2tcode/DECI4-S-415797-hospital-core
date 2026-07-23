const express = require("express");
const router = express.Router();
const controller = require("../controllers/appointmentController");

router.get("/", controller.getAppointments);

router.put("/:id/complete", controller.completeAppointment);

router.post("/", controller.createAppointment);

router.put("/:id/cancel", controller.cancelAppointment);

router.get("/doctor/:id", controller.getDoctorAppointments);

module.exports = router;
