import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDb } from "./src/db/connect.js";  
import authRouter from "./src/routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Debug environment variables
console.log('🔍 Debug: Checking environment variables...');
console.log('JWT_SECRET exists?', !!process.env.JWT_SECRET);
console.log('MONGODB_URI exists?', !!process.env.MONGODB_URI);

// CORS Configuration - ALLOW PRODUCTION FRONTEND
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://auth-x-frontend.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,  // ← VERY IMPORTANT
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],  // ← Added Cookie
  exposedHeaders: ['Set-Cookie']  // ← Added
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Logging middleware
app.use((req, res, next) => {
  console.log(`📝 ${req.method} ${req.path}`);
  console.log('📦 Body:', req.body);
  next();
});

// Routes
app.use("/api/v1/auth", authRouter);

// Health check route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Auth-X Backend API is running',
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Start server
const startServer = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    await connectDb();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server started on port ${PORT}`);
      console.log(`📍 API available at http://localhost:${PORT}/api/v1/auth`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
