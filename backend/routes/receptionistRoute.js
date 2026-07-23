const express = require("express");
const router = express.Router();

const receptionistController = require("../controllers/receptionistController");

router.post("/login", receptionistController.login);

router.get("/", receptionistController.getAllReceptionists);

router.delete("/:id", receptionistController.deleteReceptionist);

router.post("/", receptionistController.createReceptionist);

module.exports = router;