const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const sgMail = require("@sendgrid/mail");
const logger = require("../utils/logger"); // Import logger

// Check if SendGrid API key is set
if (!process.env.SENDGRID_API_KEY) {
  logger.error("❌ SENDGRID_API_KEY is missing. Emails will not be sent.");
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Contact Route
router.post("/", async (req, res) => {
  const { user_name, user_email, user_contact, subject, message } = req.body;

  if (!user_name || !user_email || !user_contact || !subject || !message) {
    return res.status(400).json({ success: false, error: "All fields are required!" });
  }

  try {
    // Save message to MongoDB
    const newContact = new Contact(req.body);
    await newContact.save();
    logger.info(`✅ Contact message saved: ${user_email}`);

    // Validate sender email
    if (!process.env.SENDER_EMAIL || !process.env.ADMIN_EMAIL) {
      logger.error("❌ Missing SENDER_EMAIL or ADMIN_EMAIL in environment variables.");
      return res.status(500).json({ success: false, error: "Email configuration error." });
    }

    // Email Message
    const msg = {
      to: process.env.ADMIN_EMAIL,
      from: process.env.SENDER_EMAIL,
      subject: `New Contact Message from ${user_name}`,
      text: `Name: ${user_name}\nEmail: ${user_email}\nContact: ${user_contact}\n\nMessage:\n${message}`,
      html: `
        <h3>New Contact Request</h3>
        <p><strong>Name:</strong> ${user_name}</p>
        <p><strong>Email:</strong> ${user_email}</p>
        <p><strong>Contact:</strong> ${user_contact}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    // Send Email
    await sgMail.send(msg);
    logger.info(`✅ Email sent to ${process.env.ADMIN_EMAIL} from ${user_email}`);

    res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    logger.error(`❌ Email Send Error: ${error.message}`);
    if (error.response) {
      logger.error(`SendGrid Response: ${JSON.stringify(error.response.body)}`);
    }
    res.status(500).json({ success: false, error: "Failed to send message. Try again later." });
  }
});

module.exports = router;
