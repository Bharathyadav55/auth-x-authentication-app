// Importing necessary modules
import jwt from "jsonwebtoken";

// user model
import { User } from "../models/user.model.js";

// Protected route for auth
export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    
    if (!token) {
      return res.status(401).json({  // ← Changed from 400 to 401
        success: false, 
        message: "Not Authorized - No token provided" 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (!decoded) {
      return res.status(401).json({  // ← Changed from 400 to 401
        success: false, 
        message: "Invalid Token" 
      });
    }

    const user = await User.findById(decoded.userId).select("-password");
    
    if (!user) {
      return res.status(404).json({  // ← Changed from 400 to 404
        success: false, 
        message: "User not found" 
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("❌ Auth middleware error:", error.message);
    
    // Handle specific JWT errors
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid token" 
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false, 
        message: "Token expired" 
      });
    }

    return res.status(500).json({ 
      success: false, 
      message: "Authentication error" 
    });
  }
};
