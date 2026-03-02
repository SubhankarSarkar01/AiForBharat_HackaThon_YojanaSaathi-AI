import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Main Root Endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to YojanaSaathi AI API' });
});
app.get("/health", (req, res) => {
    res.json({
        success: true,
        status: "ok",
        useAws: process.env.USE_AWS === "true",
        region: process.env.AWS_REGION || "ap-south-1"
    });
});

// API Routes
app.use('/api', apiRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Server error' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
