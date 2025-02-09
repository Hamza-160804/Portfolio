const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    user_name: { type: String, required: true },
    user_email: { type: String, required: true },
    user_contact: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", ContactSchema);
