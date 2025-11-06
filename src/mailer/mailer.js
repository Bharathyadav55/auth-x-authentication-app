import nodemailer from "nodemailer";
import {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./template.js";

// Gmail SMTP Configuration with better settings
export const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // use TLS
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
  tls: {
    rejectUnauthorized: false
  },
  connectionTimeout: 10000,
  greetingTimeout: 5000,
  socketTimeout: 10000,
});

// Test connection with detailed logging
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ GMAIL CONNECTION FAILED');
    console.error('Error details:', error.message);
    console.error('Make sure:');
    console.error('1. MAILTRAP_USER is set correctly');
    console.error('2. MAILTRAP_PASS is a valid Gmail App Password');
    console.error('3. 2-Step Verification is enabled on Gmail');
  } else {
    console.log('✅ GMAIL CONNECTION SUCCESSFUL');
    console.log(`📧 Ready to send emails from: ${process.env.MAILTRAP_USER}`);
  }
});

// Verification email
export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    console.log(`📧 Attempting to send verification email to: ${email}`);
    console.log(`🔢 Verification code: ${verificationToken}`);

    const mailOptions = {
      from: `"Auth-X" <${process.env.MAILTRAP_USER}>`,
      to: email,
      subject: "Verify Your Email - Auth-X",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
    };

    const response = await transporter.sendMail(mailOptions);
    console.log("✅ Verification email sent successfully!");
    console.log("📬 Message ID:", response.messageId);
    return response;
  } catch (error) {
    console.error("❌ Failed to send verification email");
    console.error("Error message:", error.message);
    console.error("Error code:", error.code);
    throw new Error(`Email sending failed: ${error.message}`);
  }
};

// Welcome email
export const sendWelcomeEmail = async (email, name) => {
  try {
    console.log(`📧 Sending welcome email to: ${email}`);

    const mailOptions = {
      from: `"Auth-X" <${process.env.MAILTRAP_USER}>`,
      to: email,
      subject: "Welcome to Auth-X! 🎉",
      html: WELCOME_EMAIL_TEMPLATE.replace("{userName}", name),
    };

    const response = await transporter.sendMail(mailOptions);
    console.log("✅ Welcome email sent:", response.messageId);
    return response;
  } catch (error) {
    console.error("❌ Failed to send welcome email:", error.message);
    throw error;
  }
};

// Reset password email
export const sendResetPasswordEmail = async (email, resetUrl) => {
  try {
    console.log(`📧 Sending password reset email to: ${email}`);

    const mailOptions = {
      from: `"Auth-X" <${process.env.MAILTRAP_USER}>`,
      to: email,
      subject: "Reset Your Password - Auth-X",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
    };

    const response = await transporter.sendMail(mailOptions);
    console.log("✅ Reset email sent:", response.messageId);
    return response;
  } catch (error) {
    console.error("❌ Failed to send reset email:", error.message);
    throw error;
  }
};

// Reset success email
export const sendResetSuccessEmail = async (email) => {
  try {
    console.log(`📧 Sending reset success email to: ${email}`);

    const mailOptions = {
      from: `"Auth-X" <${process.env.MAILTRAP_USER}>`,
      to: email,
      subject: "Password Changed Successfully - Auth-X",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    };

    const response = await transporter.sendMail(mailOptions);
    console.log("✅ Success email sent:", response.messageId);
    return response;
  } catch (error) {
    console.error("❌ Failed to send success email:", error.message);
    throw error;
  }
};
