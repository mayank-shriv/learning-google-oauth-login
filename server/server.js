import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import authRouter from './routes/authRouter.js';
import dbconnection from './models/dbconnection.js';

const port = process.env.PORT || 7070;

const app = express();

// Security headers
app.use(helmet());

// CORS — restrict to allowed origins only
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map(o => o.trim());

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (e.g. mobile apps, curl)
        // Remove this check in production if not needed
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true
}));

// Rate limiting on auth routes — 10 requests per 15 minutes per IP
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: 'Too many requests, please try again later.' }
});

app.use('/auth', authLimiter, authRouter);

app.get('/', (req, res) => {
    res.send(`Hello from auth server`);
});

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});