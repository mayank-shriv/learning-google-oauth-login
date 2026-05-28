import 'dotenv/config';
import express from 'express';
import authRouter from './routes/authRouter.js';

import dbconnection from './models/dbconnection.js'
import cors from 'cors';

const port = process.env.PORT || 7070;

const app = express();
app.use(cors());
app.use('/auth', authRouter);
app.get('/', (req, res) => {
    res.send(`Hello from auth server`);
});

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});