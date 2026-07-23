const Receptionist = require("../models/receptionistModel");

exports.login = async (req, res) => {
  try {
    const { name, id } = req.body;

    const receptionist = await Receptionist.findOne({
      name,
      id,
    });

    if (!receptionist) {
      return res.json({
        success: false,
      });
    }

    return res.json({
      success: true,
      receptionist,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getAllReceptionists = async (req, res) => {
  try {
    const receptionists = await Receptionist.find();

    res.status(200).json(receptionists);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch receptionists",
      error: err.message,
    });
  }
};

exports.deleteReceptionist = async (req, res) => {
  try {
    const receptionist = await Receptionist.findOneAndDelete({
      id: Number(req.params.id),
    });

    if (!receptionist) {
      return res.status(404).json({
        message: "Receptionist not found",
      });
    }

    res.status(200).json({
      message: "Receptionist deleted successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to delete receptionist",
      error: err.message,
    });
  }
};


exports.createReceptionist = async (req, res) => {
  try {
    const receptionist = new Receptionist(req.body);

    await receptionist.save();

    res.status(201).json(receptionist);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to create receptionist",
      error: err.message,
    });
  }
};