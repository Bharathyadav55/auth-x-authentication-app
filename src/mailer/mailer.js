import nodemailer from "nodemailer";
import {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./template.js";

// Gmail SMTP Configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

// Test connection
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ GMAIL CONNECTION ERROR:", error.message);
  } else {
    console.log("✅ GMAIL CONNECTION SUCCESSFUL");
  }
});

// Verification email
export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    console.log(`📧 Sending to: ${email}`);

    const mailOptions = {
      from: process.env.MAILTRAP_USER,
      to: email,
      subject: "Verify Your Email - Auth-X",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
    };

    const response = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", response.messageId);
    return response;
  } catch (error) {
    console.error("❌ Error:", error.message);
    throw error;
  }
};

// Welcome email
export const sendWelcomeEmail = async (email, name) => {
  try {
    const mailOptions = {
      from: process.env.MAILTRAP_USER,
      to: email,
      subject: "Welcome to Auth-X!",
      html: WELCOME_EMAIL_TEMPLATE.replace("{userName}", name),
    };

    const response = await transporter.sendMail(mailOptions);
    console.log("✅ Welcome email sent:", response.messageId);
    return response;
  } catch (error) {
    console.error("❌ Error:", error.message);
    throw error;
  }
};

// Reset password email
export const sendResetPasswordEmail = async (email, resetUrl) => {
  try {
    const mailOptions = {
      from: process.env.MAILTRAP_USER,
      to: email,
      subject: "Reset Your Password - Auth-X",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
    };

    const response = await transporter.sendMail(mailOptions);
    console.log("✅ Reset email sent:", response.messageId);
    return response;
  } catch (error) {
    console.error("❌ Error:", error.message);
    throw error;
  }
};

// Reset success email
export const sendResetSuccessEmail = async (email) => {
  try {
    const mailOptions = {
      from: process.env.MAILTRAP_USER,
      to: email,
      subject: "Password Changed Successfully - Auth-X",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    };

    const response = await transporter.sendMail(mailOptions);
    console.log("✅ Success email sent:", response.messageId);
    return response;
  } catch (error) {
    console.error("❌ Error:", error.message);
    throw error;
  }
};
