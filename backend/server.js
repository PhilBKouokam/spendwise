import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";

import transRoutes from "./routes/transaction.js";
import authRoutes from "./routes/auth.js";
import uploadRoutes from "./routes/upload.js";

dotenv.config();

const app = express();

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://spendwise-two-navy.vercel.app"
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use("/api/upload", uploadRoutes);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use("/api/trans", transRoutes);
app.use("/api/auth", authRoutes);   

app.get("/", (req, res) => {
    res.send("SpendWise API is running...");
});

const startServer = async () => {
    try {
        await connectDB();

        const PORT = process.env.PORT || 4600;
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`)
        });
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();