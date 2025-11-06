// Importing necessary modules
import bcrypt from "bcrypt";

// user model
import { User } from "../models/user.model.js";

// JWT utility function
import { generateJwt } from "../utils/jwt.js";

// Email functions
import {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendResetPasswordEmail,
  sendResetSuccessEmail,
} from "../mailer/mailer.js";

// Checking environment
const isProduction = process.env.NODE_ENV === "production";

// Register controller
export const register = async (req, res) => {
  try {
    console.log('📌 Register endpoint hit');
    console.log('Request body:', req.body);
    
    const { username, email, password } = req.body;
    
    // Validation
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all fields" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    await newUser.save();
    console.log('✅ User created:', newUser._id);

    // Generate JWT
    const token = generateJwt(newUser._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Send verification email
    try {
      await sendVerificationEmail(newUser.email, verificationToken);
      console.log('✅ Verification email sent');
    } catch (emailError) {
      console.error('⚠️ Email error:', emailError.message);
    }

    return res
      .status(201)
      .json({ success: true, message: "User Created Successfully" });
      
  } catch (error) {
    console.error('❌ Register error:', error.message);
    console.error('Stack:', error.stack);
    
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        message: `${field === "username" ? "Username" : "Email"} is already taken`,
      });
    }
    
    return res.status(500).json({ 
      success: false, 
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};


// Login controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    if (!user.isVerified) {
      return res
        .status(400)
        .json({ success: false, message: "Email not verified" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    const token = generateJwt(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",  // ← Changed
      maxAge: 7 * 24 * 60 * 60 * 1000,
      domain: process.env.NODE_ENV === "production" ? ".onrender.com" : undefined,  // ← Added
    });

    const resUser = await User.findOne({ email }).select("-password");
    return res
      .status(200)
      .json({ success: true, message: "Login successfull", user: resUser });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Logout controller
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "None" : true,
    });
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// CheckAuth controller
export const checkAuth = async (req, res) => {
  try {
    // User is already authenticated (verified by protectedRoute middleware)
    return res.status(200).json({ 
      success: true,  // ← Changed from false to true
      message: "Authenticated", 
      user: req.user 
    });
  } catch (error) {
    console.error("❌ CheckAuth error:", error.message);
    return res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};


// Verify email controller
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "Token not provided" });
    }

    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid token" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;

    await user.save();

    await sendWelcomeEmail(user.email, user.username);

    return res
      .status(200)
      .json({ success: true, message: "Email verfied successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Forget password controller
export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email not provided" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found with this email" });
    }

    const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;
    await user.save();

    await sendResetPasswordEmail(
      user.email,
      `${process.env.CLIENT_URL}/resetpassword/${resetToken}`
    );

    return res.status(200).json({ success: true, message: "Email sent !" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Password reset controller
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    if (!token || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Credentials not provided" });
    }

    const user = await User.findOne({ resetPasswordToken: token });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    if (
      user.resetPasswordTokenExpiresAt &&
      user.resetPasswordTokenExpiresAt < Date.now()
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Reset token has expired" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiresAt = undefined;
    await user.save();

    await sendResetSuccessEmail(user.email);

    return res
      .status(200)
      .json({ success: true, message: "Password Changed Successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
