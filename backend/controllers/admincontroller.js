const Admin = require("../models/adminModel");

exports.login = async (req, res) => {
  try {
    const { name, id } = req.body;

    const admin = await Admin.findOne({
      name,
      id,
    });

    if (!admin) {
      return res.json({
        success: false,
      });
    }

    res.json({
      success: true,
      admin,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.createAdmin = async (req, res) => {
  try {
    const admin = new Admin(req.body);

    await admin.save();

    res.status(201).json(admin);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to create admin",
      error: err.message,
    });
  }
};

exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to fetch admins",
      error: err.message,
    });
  }
};
